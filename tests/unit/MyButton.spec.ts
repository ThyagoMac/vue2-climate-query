import { mount } from "@vue/test-utils";
import MyButton from "@/components/buttons/Mybutton.vue";

describe("MyButton", () => {
  it("renders button", () => {
    const wrapper = mount(MyButton);
    const vBtn = wrapper.find(".my-button");

    expect(vBtn.exists()).toBe(true);
  });

  it("passes props correctly to button", () => {
    const wrapper = mount(MyButton, {
      propsData: {
        color: "red",
        text: false,
        outlined: true,
        block: true,
        xLarge: true,
        icon: "mdi-home",
      },
    });

    const vBtn = wrapper.find(".my-button");
    expect(vBtn.props("color")).toBe("red");
    expect(vBtn.props("text")).toBe(false);
    expect(vBtn.props("outlined")).toBe(true);
    expect(vBtn.props("block")).toBe(true);
    expect(vBtn.props("xLarge")).toBe(true);
    expect(vBtn.props("icon")).toBe("mdi-home");
  });

  it("uses default prop values when not provided", () => {
    const wrapper = mount(MyButton);
    const vBtn = wrapper.find(".my-button");
    expect(vBtn.props("color")).toBe("white accent-4");
    expect(vBtn.props("text")).toBe(true);
    expect(vBtn.props("outlined")).toBe(false);
    expect(vBtn.props("block")).toBe(false);
    expect(vBtn.props("xLarge")).toBe(false);
    expect(vBtn.props("icon")).toBeUndefined();
  });

  it("emits a click event when clicked", async () => {
    const wrapper = mount(MyButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")?.length).toBe(1);
  });

  it("renders slot content", () => {
    const wrapper = mount(MyButton, {
      slots: {
        default: "<span>Click test</span>",
      },
    });
    expect(wrapper.html()).toContain("<span>Click test</span>");
  });
});
