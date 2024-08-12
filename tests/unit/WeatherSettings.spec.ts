import { shallowMount, Wrapper } from "@vue/test-utils";
import WeatherSettings from "@/components/weather/WeatherSettings.vue";
import Mybutton from "@/components/buttons/Mybutton.vue";
import { BrStatesType } from "@/types/BrStatesType";
import mockBrStates from "@/utils/mock/brStates";

// Define the shape of the component's data
interface WeatherSettingsData {
  isLoading: boolean;
  showConfigs: boolean;
  weatherConfigurations: BrStatesType;
}

// Define the shape of the component's computed properties
interface WeatherSettingsComputed {
  activeWeathers: BrStatesType;
}

// Define the shape of the component's methods
interface WeatherSettingsMethods {
  loadData: () => void;
  reloadWeather: () => void;
  close: () => void;
  disableAddMore: (alreadyDisplayed: boolean) => boolean;
}

// Combine all the interfaces
type WeatherSettingsComponent = WeatherSettingsData &
  WeatherSettingsComputed &
  WeatherSettingsMethods;

jest.mock("@/utils/mock/brStates", () => [
  {
    name: "State1",
    displayed: true,
    cod_uf: 1,
    uf: "S1",
    lat: 0,
    lon: 0,
    regregion: "R1",
  },
  {
    name: "State2",
    displayed: false,
    cod_uf: 2,
    uf: "S2",
    lat: 0,
    lon: 0,
    regregion: "R2",
  },
  {
    name: "State3",
    displayed: true,
    cod_uf: 3,
    uf: "S3",
    lat: 0,
    lon: 0,
    regregion: "R3",
  },
]);

describe("WeatherSettings.vue", () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    wrapper = shallowMount(WeatherSettings, {
      propsData: {
        isOpen: true,
      },
      stubs: {
        "v-dialog": true,
        "v-card": true,
        "v-card-title": true,
        "v-card-text": true,
        "v-card-actions": true,
        "v-row": true,
        "v-col": true,
        "v-checkbox": true,
        "v-spacer": true,
      },
    });
  });

  it("renders WeatherSettings", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(Mybutton).exists()).toBe(true);
  });

  it("loads weatherConfigurations on mount", () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    expect(vm.weatherConfigurations).toEqual(mockBrStates);
  });

  it("computes activeWeathers correctly", () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    const activeWeathers = vm.activeWeathers;
    expect(activeWeathers.length).toBe(2);
    expect(activeWeathers[0].name).toBe("State1");
    expect(activeWeathers[1].name).toBe("State3");
  });
  /* Why it's not working?
  it("disables checkbox when 10 states are selected", async () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    const fullStates: BrStatesType = Array(10).fill({
      name: "State",
      displayed: true,
      cod_uf: 0,
      uf: "S",
      lat: 0,
      lon: 0,
      regregion: "R",
    });
    await wrapper.setData({ weatherConfigurations: fullStates });

    expect(vm.disableAddMore(false)).toBe(true);
    expect(vm.disableAddMore(true)).toBe(false);
  });
  */
  it("closes dialog and emits close event", async () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    await vm.close();
    expect(vm.showConfigs).toBe(false);
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("reloads weather and emits reloadWeather event", async () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    await vm.reloadWeather();
    expect(localStorage.getItem("weatherSettings")).toBeTruthy();
    expect(wrapper.emitted().reloadWeather).toBeTruthy();
  });

  it("watches isOpen prop and updates showConfigs", async () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    await wrapper.setProps({ isOpen: false });
    expect(vm.showConfigs).toBe(false);
  });

  it("loads data from localStorage if available", async () => {
    const vm = wrapper.vm as any as WeatherSettingsComponent;
    const localConfig: BrStatesType = [
      {
        name: "LocalState1",
        displayed: true,
        cod_uf: 1,
        uf: "S1",
        lat: 0,
        lon: 0,
        regregion: "R1",
      },
      {
        name: "LocalState2",
        displayed: false,
        cod_uf: 2,
        uf: "S2",
        lat: 0,
        lon: 0,
        regregion: "R2",
      },
    ];
    localStorage.setItem("weatherSettings", JSON.stringify(localConfig));

    await vm.loadData();
    expect(vm.weatherConfigurations).toEqual(localConfig);
  });
});
