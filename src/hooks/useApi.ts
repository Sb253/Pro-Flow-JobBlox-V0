// React hooks for API integration
import { useState, useEffect, useCallback } from "react";
import { apiService } from "../services/api";
import { ApiResponse } from "../types/backend";

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || "Unknown error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  apiCall: (params: {
    page: number;
    limit: number;
  }) => Promise<ApiResponse<T[]>>,
  initialPage = 1,
  initialLimit = 10,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall({ page, limit });
      if (response.success && response.data) {
        setData(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
          setTotal(response.pagination.total);
        }
      } else {
        setError(response.error || "Unknown error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiCall, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    data,
    loading,
    error,
    page,
    limit,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    refetch: fetchData,
  };
}

// Hook for mutations (create, update, delete)
export function useMutation<T, P>(
  mutationFn: (params: P) => Promise<ApiResponse<T>>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (params: P) => {
      try {
        setLoading(true);
        setError(null);
        const response = await mutationFn(params);
        if (response.success && response.data) {
          setData(response.data);
          return response.data;
        } else {
          const errorMessage = response.error || "Unknown error occurred";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, loading, error, data, reset };
}

// Specific hooks for common entities
export function useCustomers(params?: {
  status?: string;
  type?: string;
  search?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getCustomers({ page, limit, ...params }),
    1,
    10,
  );
}

export function useCustomer(id: string) {
  return useApi(() => apiService.getCustomer(id), [id]);
}

export function useJobs(params?: {
  status?: string;
  customerId?: string;
  assignedTo?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getJobs({ page, limit, ...params }),
    1,
    10,
  );
}

export function useJob(id: string) {
  return useApi(() => apiService.getJob(id), [id]);
}

export function useEstimates(params?: {
  status?: string;
  customerId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getEstimates({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEstimate(id: string) {
  return useApi(() => apiService.getEstimate(id), [id]);
}

export function useInvoices(params?: { status?: string; customerId?: string }) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getInvoices({ page, limit, ...params }),
    1,
    10,
  );
}

export function useInvoice(id: string) {
  return useApi(() => apiService.getInvoice(id), [id]);
}

export function usePayments(params?: {
  status?: string;
  customerId?: string;
  invoiceId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getPayments({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEmployees(params?: {
  status?: string;
  department?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getEmployees({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEmployee(id: string) {
  return useApi(() => apiService.getEmployee(id), [id]);
}

export function useInventoryItems(params?: {
  category?: string;
  lowStock?: boolean;
}) {
  return usePaginatedApi(
    ({ page, limit }) =>
      apiService.getInventoryItems({ page, limit, ...params }),
    1,
    10,
  );
}

export function useTimeEntries(params?: {
  employeeId?: string;
  jobId?: string;
  startDate?: string;
  endDate?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getTimeEntries({ page, limit, ...params }),
    1,
    10,
  );
}

export function useDocuments(params?: {
  category?: string;
  relatedType?: string;
  relatedId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getDocuments({ page, limit, ...params }),
    1,
    10,
  );
}

export function useNotifications(unread?: boolean) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getNotifications({ page, limit, unread }),
    1,
    20,
  );
}

// Mutation hooks
export function useCreateCustomer() {
  return useMutation(apiService.createCustomer.bind(apiService));
}

export function useUpdateCustomer() {
  return useMutation(({ id, data }: { id: string; data: any }) =>
    apiService.updateCustomer(id, data),
  );
}

export function useDeleteCustomer() {
  return useMutation((id: string) => apiService.deleteCustomer(id));
}

export function useCreateJob() {
  return useMutation(apiService.createJob.bind(apiService));
}

export function useUpdateJob() {
  return useMutation(({ id, data }: { id: string; data: any }) =>
    apiService.updateJob(id, data),
  );
}

export function useCreateEstimate() {
  return useMutation(apiService.createEstimate.bind(apiService));
}

export function useSendEstimate() {
  return useMutation(({ id, email }: { id: string; email?: string }) =>
    apiService.sendEstimate(id, email),
  );
}

export function useApproveEstimate() {
  return useMutation((id: string) => apiService.approveEstimate(id));
}

export function useCreateInvoice() {
  return useMutation(apiService.createInvoice.bind(apiService));
}

export function useSendInvoice() {
  return useMutation(({ id, email }: { id: string; email?: string }) =>
    apiService.sendInvoice(id, email),
  );
}

export function useCreatePayment() {
  return useMutation(apiService.createPayment.bind(apiService));
}

export function useProcessPayment() {
  return useMutation((id: string) => apiService.processPayment(id));
}

export function useStartTimer() {
  return useMutation(
    ({
      employeeId,
      jobId,
      description,
    }: {
      employeeId: string;
      jobId?: string;
      description?: string;
    }) => apiService.startTimer(employeeId, jobId, description),
  );
}

export function useStopTimer() {
  return useMutation((id: string) => apiService.stopTimer(id));
}

export function useUploadDocument() {
  return useMutation(({ file, metadata }: { file: File; metadata: any }) =>
    apiService.uploadDocument(file, metadata),
  );
}
