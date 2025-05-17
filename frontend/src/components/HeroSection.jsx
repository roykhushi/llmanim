
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input.jsx";
import { CoverSpeed } from "./CoverSpeed.jsx";

export function HeroSection() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <div
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        <CoverSpeed />
      </div>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}
