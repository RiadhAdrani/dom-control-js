import { expect, it, beforeEach, describe } from "@jest/globals";
import { removeEvent, setEvent } from ".";
import { createElement } from "../element";

describe("setEvent", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        count = 0;
    });

    let count = 0;

    it.each([
        [0, 0, 0],
        ["onclick", 0, 0],
        [0, () => {}, 0],
        [
            "onclick",
            () => {
                count++;
            },
            1,
        ],
    ])("should add click event", (event, callback, expected) => {
        const el = createElement("div");

        setEvent(event as unknown as string, callback as unknown as (e: Event) => void, el);
        (el as HTMLElement).click();

        expect(count).toBe(expected);
    });

    it("should remove click event", () => {
        const el = createElement("div");

        setEvent(
            "onclick",
            () => {
                count++;
            },
            el
        );
        (el as HTMLElement).click();

        expect(count).toBe(1);

        removeEvent("onclick", el);
        (el as HTMLElement).click();

        expect(count).toBe(1);
    });
});
