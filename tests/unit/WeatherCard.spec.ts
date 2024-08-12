import { shallowMount, Wrapper } from "@vue/test-utils";
import WeatherCard from "@/components/weather/WeatherCard.vue";

describe("WeatherCard.vue", () => {
  let wrapper: Wrapper<Vue>;
  const weatherMock = {
    name: "Test State Name",
    main: {
      temp: 30,
      feels_like: 32,
      humidity: 70,
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(WeatherCard, {
      propsData: {
        index: 0,
        isLoading: false,
        size: 6,
        weather: weatherMock,
      },
    });
  });

  it("should renders weather name correctly", () => {
    expect(wrapper.find(".text-h4").text()).toContain(weatherMock.name);
  });

  it("should displays temperature correctly", () => {
    const tempText = wrapper.find(".text-h3").text();
    expect(tempText).toContain(Math.round(weatherMock.main.temp).toString());
  });

  it("should applies correct class based on temperature", () => {
    const vCard = wrapper.find(".my-3.mx-3");

    expect(vCard.classes()).toContain("card-bg-normal");
  });

  it("should shows loading state when isLoading is true", async () => {
    await wrapper.setProps({ isLoading: true });
    const vCard = wrapper.find(".my-3.mx-3");
    expect(vCard.attributes("loading")).toBe("true");
  });
});
