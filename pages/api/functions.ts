import { baseURL } from "@/utils/baseURL";

export const functions = [
  {
    name: "check_shoes_availability",
    description:
      "Get the name and the size of the shoes that the user would like to know. Return the info of shoes.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "name of the shoes the user want",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "recommend_other_shoes_available",
    description:
      "Recommend given the info of the shoes the user would like to know. Return the info of three shoes.",
    parameters: {
      type: "object",
      properties: {
        size: {
          type: "string",
          description: "size of the shoes the user want.",
        },
      },
      required: ["size"],
    },
  },
];

async function check_shoes_availability(name) {
  const searchResponse = await fetch(`${baseURL}/api/shoes`);

  if (!searchResponse.ok) {
    throw new Error(searchResponse.statusText);
  }
  const results = await searchResponse.json();

  const shoesExist = results.filter((item) => {
    const sizes = JSON.parse(item.sizes);
    return name.toLowerCase() === item.name.toLowerCase() && sizes.length > 0;
  });
  const randomNumb = Math.floor(Math.random() * 10);

  const noShoes = results
    .filter((items) => name.toLowerCase() !== items.name.toLowerCase())
    .slice(randomNumb, randomNumb + 3);

  if (shoesExist.length > 0) {
    return shoesExist.map((items) => {
      const sizeInStock = JSON.parse(items.sizes).filter((ele) => ele.inStock);
      const colorWithoutSlash = items.color.toLowerCase().split("/");
      const isColor = colorWithoutSlash.map((ele) => ele.trim());
      return {
        name_of_shoes: name,
        sizes_in_stock: sizeInStock,
        colors_available: isColor,
        description: items.accordions,
        category_of_shoes: items.category,
      };
    });
  }
  return noShoes.map((items) => {
    const sizeInStock = JSON.parse(items.sizes).filter((ele) => ele.inStock);
    const colorWithoutSlash = items.color.toLowerCase().split("/");
    const isColor = colorWithoutSlash.map((ele) => ele.trim());

    return {
      name_of_shoes: items.name,
      sizes_in_stock: sizeInStock,
      colors_available: isColor,
      description: items.accordions,
      category_of_shoes: items.category,
    };
  });
}

async function recommend_other_shoes_available(size) {
  const searchResponse = await fetch(`${baseURL}/api/shoes`);

  if (!searchResponse.ok) {
    throw new Error(searchResponse.statusText);
  }
  const results = await searchResponse.json();

  const noShoes = results.filter((items) => {
    const sizes = JSON.parse(items.sizes);
    return sizes.some((ele) => ele.inStock && ele.size.includes(size));
  });

  return noShoes.map((items) => {
    const sizeInStock = JSON.parse(items.sizes).filter((ele) => ele.inStock);
    const colorWithoutSlash = items.color.toLowerCase().split("/");
    const isColor = colorWithoutSlash.map((ele) => ele.trim());

    return {
      name_of_shoes: items.name,
      sizes_in_stock: sizeInStock,
      colors_available: isColor,
      description: items.accordions,
      category_of_shoes: items.category,
    };
  });
}

export async function runFunction(name: string, args: any) {
  switch (name) {
    case "check_shoes_availability":
      return await check_shoes_availability(args["name"]);
      break;
    case "recommend_other_shoes_available":
      return await recommend_other_shoes_available(args["size"]);
      break;
    default:
      return null;
  }
}
