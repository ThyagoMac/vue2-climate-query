/* import { mount } from "@vue/test-utils";
import mockWeatherList from "@/utils/mock/weather";
import WeatherCard from "@/components/weather/WeatherCard.vue";
import { WeatherType } from "@/types/WeatherType";

describe("WeatherCard Component", () => {
  const mockedList: WeatherType[] = mockWeatherList;
  const propsData = {
    index: 0,
    weather: mockedList[0],
  };

  it("should test rendering cards", () => {
    const wrapper = mount(WeatherCard, { props: propsData });

    expect(wrapper.exists()).toBe(true);
  });
});
 */
import Mybutton from "@/components/buttons/Mybutton.vue";
import { mount } from "@vue/test-utils";

describe("Btn Component", () => {
  const propsData = {
    outlined: true,
    color: "test",
    text: true,
    block: false,
    xLarge: false,
    icon: "String",
  };
  it("shoul pipi", () => {
    const wrapper = mount(Mybutton, {
      propsData: propsData,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
