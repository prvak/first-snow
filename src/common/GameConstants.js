export const Food = {
  BERRY: "BERRY",
  FISH: "FISH",
  BIRD: "BIRD",
  CARIBOU: "CARIBOU",
};

export const Materials = {
  WOOD: "WOOD",
  STONE: "STONE",
  GRASS: "GRASS",
};

export const Items = {
  NET: "NET",
  BOW: "BOW",
  AXE: "AXE",
  SPEAR: "SPEAR",
  COAT: "COAT",
};

export const Resources = Object.assign({}, Food, Materials);

export const Craft = {
  NET: [Items.GRASS, Items.GRASS],
  BOW: [Items.WOOD, Items.GRASS],
  AXE: [Items.WOOD, Items.STONE],
  SPEAR: [Items.WOOD, Items.STONE],
  COAT: [Items.CARIBOU, Items.GRASS],
};

export const Bear = {
  UNSET: "UNSET",
  SET: "SET",
};

export const Cards = [
  {
    summer: {
      left: {
        resources: [
          { resource: Resources.WOOD, item: Item.AXE },
        ]
      },
      right: {

      },
    }
  }
];
