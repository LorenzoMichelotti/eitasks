import { TiDocument, TiWeatherNight, TiWeatherSunny } from "react-icons/ti";

export default function Navbar({
  colorMode,
  toggleColorMode,
}: {
  colorMode: string;
  toggleColorMode: () => void;
}) {
  return (
    <nav className="relative h-24 w-full flex justify-between">
      <h1 className="absolute text-xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <TiDocument />
        <span>eitasks.com</span>
      </h1>
      <div className="absolute top-1/2 -translate-y-1/2 right-12">
        <button
          onClick={toggleColorMode}
          className="text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2"
        >
          {colorMode === "dark" ? <TiWeatherNight /> : <TiWeatherSunny />}
        </button>
      </div>
    </nav>
  );
}
