import { render, screen, fireEvent} from "@testing-library/react";
import Cart from "../components/Cart";
import "@testing-library/jest-dom";

describe("Cart component", () => {
    test("displays the details of the user cart", () => {
        //Render the Cart Component
        render(<Cart />);
    })
})