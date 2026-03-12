import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import React, { act } from "react";
import {
  cleanup,
  render,
  type RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JSDOM } from "jsdom";
import Home from "./page";

type DomInstance = {
  window: Window & typeof globalThis;
};

let dom: DomInstance;
const globalWithActFlag = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};

function defineGlobalProperty<K extends keyof typeof globalThis>(
  key: K,
  value: (typeof globalThis)[K]
) {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });
}

function setupDom() {
  dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost",
  }) as DomInstance;

  const { window } = dom;

  defineGlobalProperty("window", window);
  defineGlobalProperty("document", window.document);
  defineGlobalProperty("navigator", window.navigator);
  defineGlobalProperty("localStorage", window.localStorage);
  defineGlobalProperty("HTMLElement", window.HTMLElement);
  defineGlobalProperty("Event", window.Event);
  defineGlobalProperty("MouseEvent", window.MouseEvent);
  defineGlobalProperty("Node", window.Node);
  defineGlobalProperty("Text", window.Text);
  defineGlobalProperty("EventTarget", window.EventTarget);

  if (!("attachEvent" in window.HTMLElement.prototype)) {
    Object.defineProperty(window.HTMLElement.prototype, "attachEvent", {
      configurable: true,
      value: () => {},
    });
  }

  if (!("detachEvent" in window.HTMLElement.prototype)) {
    Object.defineProperty(window.HTMLElement.prototype, "detachEvent", {
      configurable: true,
      value: () => {},
    });
  }

  globalWithActFlag.IS_REACT_ACT_ENVIRONMENT = true;
  defineGlobalProperty(
    "requestAnimationFrame",
    ((callback: FrameRequestCallback) =>
      setTimeout(callback, 0) as unknown as number) as typeof requestAnimationFrame
  );
  defineGlobalProperty(
    "cancelAnimationFrame",
    ((handle: number) => clearTimeout(handle)) as typeof cancelAnimationFrame
  );
}

beforeEach(() => {
  setupDom();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  dom.window.close();
});

async function renderHome() {
  let view: RenderResult | undefined;

  await act(async () => {
    view = render(<Home />);
    await Promise.resolve();
  });

  assert.ok(view, "Expected render result");
  return view;
}

async function setNumberInputValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  const reactPropsKey = Object.keys(input).find((key) =>
    key.startsWith("__reactProps$")
  );

  assert.ok(valueSetter, "Expected HTMLInputElement value setter to exist");
  assert.ok(reactPropsKey, "Expected React props key on controlled input");

  const reactProps = (
    input as HTMLInputElement & {
      [key: string]: unknown;
    }
  )[reactPropsKey] as {
    onChange?: (event: { target: { value: string } }) => void;
  };

  assert.equal(typeof reactProps.onChange, "function");

  await act(async () => {
    valueSetter.call(input, value);
    reactProps.onChange?.({ target: { value } });
    await Promise.resolve();
  });
}

test("generates a practice plan from the current selections", async () => {
  const view = await renderHome();
  const user = userEvent.setup({ document: window.document });

  assert.ok(view.getByText("Henüz plan oluşturulmadı."));

  await user.click(view.getByRole("button", { name: "Teori" }));
  await user.click(view.getByRole("button", { name: "10 dk" }));
  await user.click(view.getByRole("button", { name: "Kolay" }));
  await user.click(view.getByRole("button", { name: "Mini plan oluştur" }));

  assert.equal(view.queryByText("Henüz plan oluşturulmadı."), null);
  assert.ok(view.getByText("Toplam çalıştığın süre"));
  assert.equal(view.getByDisplayValue("10").getAttribute("type"), "number");

  const planHeading = view.getByRole("heading", { name: "Oluşturulan plan" });
  const planSection = planHeading.closest("section");

  assert.ok(planSection, "Expected generated plan section");
  assert.equal(planSection.querySelectorAll("h3").length, 2);
});

test("saves a completed session, updates summary and history, and clears correctly", async () => {
  const view = await renderHome();
  const user = userEvent.setup({ document: window.document });

  await user.click(view.getByRole("button", { name: "Teori" }));
  await user.click(view.getByRole("button", { name: "10 dk" }));
  await user.click(view.getByRole("button", { name: "Kolay" }));
  await user.click(view.getByRole("button", { name: "Mini plan oluştur" }));

  const minutesInput = view.getByDisplayValue("10") as HTMLInputElement;
  await setNumberInputValue(minutesInput, "27");
  assert.equal(minutesInput.value, "27");
  await user.click(view.getByRole("button", { name: "Tamamlandı olarak kaydet" }));

  assert.match(document.body.textContent ?? "", /Henüz plan oluşturulmadı\./);

  await user.click(view.getByRole("button", { name: "Progress" }));

  const progressTextAfterSave = document.body.textContent ?? "";

  assert.match(progressTextAfterSave, /Toplam oturum\s*1/);
  assert.match(progressTextAfterSave, /Toplam süre\s*27 dk/);
  assert.match(progressTextAfterSave, /Denge ihtiyacı\s*Teknik/);

  await user.click(view.getByRole("button", { name: "History" }));
  assert.match(document.body.textContent ?? "", /27 dk • Teori/);

  await user.click(view.getByRole("button", { name: "Progress" }));
  await user.click(view.getByRole("button", { name: "Kayıtları temizle" }));

  const progressTextAfterClear = document.body.textContent ?? "";

  assert.match(progressTextAfterClear, /Toplam oturum\s*0/);
  assert.match(progressTextAfterClear, /Toplam süre\s*0 dk/);
  assert.match(progressTextAfterClear, /Denge ihtiyacı\s*-/);

  await user.click(view.getByRole("button", { name: "History" }));
  assert.match(document.body.textContent ?? "", /Henüz kayıt yok\./);
});

test("persists theme selection and opens the chord finder workspace", async () => {
  const view = await renderHome();
  const user = userEvent.setup({ document: window.document });

  assert.equal(document.documentElement.dataset.theme, "dark");

  await user.click(view.getByRole("button", { name: "Light" }));

  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(localStorage.getItem("guitar-practice-theme"), "light");

  await user.click(view.getByRole("button", { name: "Chords" }));

  assert.ok(view.getByRole("heading", { name: "Chord finder" }));
  assert.ok(view.getByText("Chord tones"));
  assert.match(document.body.textContent ?? "", /C Major/);
});
