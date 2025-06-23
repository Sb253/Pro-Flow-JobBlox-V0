"use client"

import React from "react"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "../input"

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("handles value changes", async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()

    render(<Input onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    await user.type(input, "test")

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue("test")
  })

  it("applies correct type", () => {
    render(<Input type="email" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type", "email")
  })

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<Input className="custom-input" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-input")
  })

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
