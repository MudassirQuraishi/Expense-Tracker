import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
    it("validates email field", () => {
        render(<Tooltip message={"Invalid email format"} />)
        expect(screen.getByTestId("tooltip-test")).toHaveTextContent("Invalid email format");
    })
    it("validates password field", () => {
        render(<Tooltip message={"Password requirements not met"} />)
        expect(screen.getByTestId("tooltip-test")).toHaveTextContent("Password requirements not met");
    })
    it("validates confirm password field", () => {
        render(<Tooltip message={"Passwords do not match"} />)
        expect(screen.getByTestId("tooltip-test")).toHaveTextContent("Passwords do not match");
    })
    it("validates confirm password field", () => {
        render(<Tooltip message={"Passwords do  match"} />)
        expect(screen.getByTestId("tooltip-test")).toHaveTextContent("Something went wrong");
    })
})