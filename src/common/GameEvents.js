const GameEvents = {
  /** When a user joins a game as a player. Sent to all joined users. */
  USER_JOINED: "USER_JOINED",
  /** When some player chooses a bear. */
  BEAR_CHOSEN: "BEAR_CHOSEN",
  /** When some player chooses a next camp location. */
  CAMP_CHOSEN: "CAMP_CHOSEN",
};

export default GameEvents;
