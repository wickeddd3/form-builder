import React from "react";
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from "@testing-library/react";
import SpacerFieldPropertiesComponent from "@/components/builder/form-builder/fields/spacer-field/SpacerFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";
import useDesigner from "@/hooks/use-designer";

// Mocking useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SpacerFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();

  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SpacerField",
    extraAttributes: {
      height: 100,
    },
  } as CustomInstance;

  beforeEach(() => {
    // Mock useDesigner implementation
    (useDesigner as jest.Mock).mockReturnValue({
      updateElement: mockUpdateElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update height value correctly", () => {
    render(
      <SpacerFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const slider = screen.getByTestId("height-slider");

    act(() => {
      fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" }); // Simulate increasing the value by 1
    });

    waitFor(() => {
      expect(screen.getByText("Height (px): 150")).toBeInTheDocument();
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "test-id",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            height: 101, // Assuming the initial value was 100 and it increased by 1
          }),
        })
      );
    });
  });
});
