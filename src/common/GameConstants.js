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

export const LandCards = [
  {
    index: 0,
    summer: {
      left: {
        resources: [
          { resource: Resources.BERRY },
          { resource: Resources.WOOD },
          { resource: Resources.WOOD },
          { resource: Resources.WOOD, item: Items.AXE },
        ],
        cold: 0,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.WOOD, item: Items.AXE },
          { resource: Resources.WOOD },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.BERRY },
        ],
        cold: 0,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.WOOD },
          { resource: Resources.WOOD, item: Items.AXE },
        ],
        cold: 1,
        furs: 1,
      },
      right: {
        resources: [
          { resource: Resources.WOOD },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
        ],
        cold: 1,
        furs: 1,
      },
    },
  },
  {
    index: 1,
    summer: {
      left: {
        resources: [
          { resource: Resources.BERRY },
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.GRASS },
          { resource: Resources.STONE },
        ],
        cold: 0,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.WOOD },
          { resource: Resources.BIRD, item: Items.BOW },
        ],
        cold: 0,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.STONE },
        ],
        cold: 1,
        furs: 1,
      },
      right: {
        resources: [
          { resource: Resources.WOOD },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.BIRD, item: Items.BOW },
        ],
        cold: 2,
        furs: 1,
      },
    },
  },
  {
    index: 2,
    summer: {
      left: {
        resources: [
          { resource: Resources.FISH },
          { resource: Resources.FISH, item: Items.NET },
          { resource: Resources.WOOD },
          { resource: Resources.WOOD },
        ],
        cold: 0,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.GRASS },
          { resource: Resources.FISH, item: Items.NET },
          { resource: Resources.FISH, item: Items.NET },
          { resource: Resources.FISH },
        ],
        cold: 1,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.FISH, item: Items.AXE },
          { resource: Resources.FISH, item: Items.NET },
        ],
        cold: 1,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.GRASS },
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.FISH, item: Items.AXE },
        ],
        cold: 2,
        furs: 1,
      },
    },
  },
  {
    index: 3,
    summer: {
      left: {
        resources: [
          { resource: Resources.BERRY },
          { resource: Resources.FISH },
          { resource: Resources.FISH, item: Items.NET },
          { resource: Resources.GRASS },
        ],
        cold: 0,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.WOOD, item: Items.AXE },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.FISH },
          { resource: Resources.FISH },
        ],
        cold: 0,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.FISH, item: Items.AXE },
          { resource: Resources.FISH, item: Items.AXE },
        ],
        cold: 2,
        furs: 1,
      },
      right: {
        resources: [
          { resource: Resources.WOOD },
          { resource: Resources.FISH, item: Items.AXE },
        ],
        cold: 1,
        furs: 1,
      },
    },
  },
  {
    index: 4,
    summer: {
      left: {
        resources: [
          { resource: Resources.BERRY },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.GRASS },
        ],
        cold: 0,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.GRASS },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.BERRY },
        ],
        cold: 1,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.CARIBOU, item: Items.SPEAR },
          { resource: Resources.CARIBOU, item: Items.SPEAR },
        ],
        cold: 2,
        furs: 1,
      },
      right: {
        resources: [
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.BIRD, item: Items.BOW },
        ],
        cold: 2,
        furs: 0,
      },
    },
  },
  {
    index: 5,
    summer: {
      left: {
        resources: [
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.STONE },
        ],
        cold: 1,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.STONE },
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.BERRY },
        ],
        cold: 0,
        furs: 0,
      },
    },
    winter: {
      left: {
        resources: [
          { resource: Resources.BIRD, item: Items.BOW },
          { resource: Resources.STONE },
        ],
        cold: 2,
        furs: 0,
      },
      right: {
        resources: [
          { resource: Resources.STONE },
        ],
        cold: 0,
        furs: 0,
      },
    },
  },

];
