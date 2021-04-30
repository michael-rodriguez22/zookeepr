const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals.js");
const { animals } = require("../data/animals");
jest.mock("fs");

test("filters animals by query", () => {
  const sample = [
    {
      name: "Sharon",
      species: "Monkey",
      diet: "omnivore",
      personalityTraits: ["hongry", "loud"],
      id: 100,
    },
    {
      name: "Maggie",
      species: "Cow",
      diet: "omnivore",
      personalityTraits: ["goofy", "loving", "chill", "funny", "nice"],
      id: 69,
    },
  ];
  let result1 = filterByQuery({diet: "omnivore"}, sample);
  let result2 = filterByQuery({species: "Cow"}, sample);
  expect(result1.length).toEqual(2);
  expect(result2.length).toEqual(1);
});

test("finds animals by id", () => {
    const sample = [
        {
          name: "Sharon",
          species: "Monkey",
          diet: "omnivore",
          personalityTraits: ["hongry", "loud"],
          id: 100,
        },
        {
          name: "Maggie",
          species: "Cow",
          diet: "omnivore",
          personalityTraits: ["goofy", "loving", "chill", "funny", "nice"],
          id: 69,
        },
      ];
    expect(findById(69, sample)).toEqual(sample[1]);
})

test("creates a new animal object", () => {
  const animal = createNewAnimal({ name: "Sharon", id: "million" }, animals);

  expect(animal.name).toBe("Sharon");
  expect(animal.id).toBe("million");
});

test("checks for valid animal input", () => {
  const valid = {
    name: "Maggie",
    species: "Cow",
    diet: "omnivore",
    personalityTraits: ["goofy", "loving", "chill", "funny", "nice"],
    id: 69,
  };
  const invalid = {
    name: "Dennis",
    species: 420,
    diet: null,
    personalityTraits: "Menace",
  };
  expect(validateAnimal(valid)).toEqual(true);
  expect(validateAnimal(invalid)).toEqual(false);
});
