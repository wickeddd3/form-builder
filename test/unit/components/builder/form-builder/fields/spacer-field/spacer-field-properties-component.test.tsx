import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import SpacerFieldPropertiesComponent from "@/components/builder/form-builder/fields/spacer-field/SpacerFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";

// Mocking useDesigner hook
const mockUpdateElement = jest.fn(); // Define the mock function
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateElement: mockUpdateElement,
  })),
}));

describe("SpacerFieldPropertiesComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SpacerField",
    extraAttributes: {
      height: 100,
    },
  } as CustomInstance;

  it("should update height value correctly", async () => {
    const { getByTestId, getByText } = render(
      <SpacerFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const slider = getByTestId("height-slider");
    slider.focus();

    act(() => {
      fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" }); // Simulate increasing the value by 1
    });

    act(() => {
      fireEvent.blur(getByText(/Height/));
    });

    await waitFor(() => {
      expect(getByText("Height (px): 101")).toBeInTheDocument();
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
