import { describe, expect, it } from "vitest";
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import Button from "./components/Button";
import useStatus from "./hooks/useStatus";
import AppProviders, { useUser } from "./providers/AppProviders";

describe("Component test", () => {
  it("should disabled button", async () => {
    render(<Button isDisabled={true}>Click me</Button>);
    const element = screen.getByText("Click me");
    fireEvent.click(element);
    expect(await screen.findByText("Click me")).toBeInTheDocument();
    expect(await screen.findByText("Click me")).toHaveAttribute("disabled");
  });

  it("should enabled button", async () => {
    render(<Button isDisabled={false}>Click me</Button>);
    const element = screen.getByText("Click me");
    fireEvent.click(element);
    expect(await screen.findByText("Click me")).toBeInTheDocument();
    expect(await screen.findByText("Click me")).not.toHaveAttribute("disabled");
  });
});

describe("Providers Test", () => {
  const TestComponent = () => {
    const mockUser = {
      firstName: "Yosua",
      lastName: "Halim",
    };
    const context = useUser();
    const { setUser, user } = context;

    return (
      <div>
        <p>{user?.firstName}</p>
        <button
          onClick={() => {
            setUser?.(mockUser);
          }}
        >
          Change
        </button>
      </div>
    );
  };

  it("should change user", async () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    const button = screen.getByText("Change");
    waitFor(async () => fireEvent.click(button));
    expect(await screen.findByText("Yosua")).toBeInTheDocument();
  });
});

describe("Hooks test", () => {
  it("should show Diterima", async () => {
    const hook = renderHook(() => useStatus({ status: "approved" }));
    expect(hook.result.current.statusLabel).toBe("Diterima");
  });

  it("should show Ditolak", async () => {
    const hook = renderHook(() => useStatus({ status: "rejected" }));
    expect(hook.result.current.statusLabel).toBe("Ditolak");
  });
});

describe("Homepage test", () => {
  it("should render homepage", async () => {
    const document = render(<App />);
    expect(document).toBeDefined();
  });

  it("should change page", async () => {
    render(<App />);
    const element = screen.getByText("Form");
    fireEvent.click(element);
    expect(await screen.findByText("Back")).toBeInTheDocument();
  });

  it("should go back to home page", async () => {
    render(<App />);
    const element = screen.getByText("Back");
    fireEvent.click(element);
    expect(await screen.findByText("Pokemon Stats")).toBeInTheDocument();
  });

  it("should see Bulbasaur", async () => {
    render(<App />);
    const element = screen.getByTestId("search");

    fireEvent.change(element, { target: { value: "bulbasaur" } });

    expect(await screen.findByText("Status")).toBeInTheDocument();
    expect(await screen.findByText("attack")).toBeInTheDocument();
    expect(await screen.findByText("hp")).toBeInTheDocument();
    expect(await screen.findByText("defense")).toBeInTheDocument();
    expect(await screen.findByText("special-attack")).toBeInTheDocument();
    expect(await screen.findByText("special-defense")).toBeInTheDocument();
    expect(await screen.findByText("speed")).toBeInTheDocument();
  });
});
