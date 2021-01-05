const Player = require('./player');

class Game {
  constructor(id) {
    this.id = id;
    this.players = {};
    this.playerLimit = 4;
    this.isActive = false;
  }

  startGame() {
    this.isActive = true;
  }

  pauseGame() {
    this.isActive = false;
  }

  createPlayer(id) {
    const playerId = `player-${id}`;
    const player = new Player(playerId);

    this.players[player.id] = player;
  }

  removePlayer(id) {
    const playerId = `player-${id}`;

    if (this.players[playerId]) {
      // delete this.players[playerId]; // ???
      this.players[playerId].isAlive = false;
    }
  }

  updateState() {
    const states = {};

    if (Object.values(this.players).every((player) => !player.isAlive)) {
      return undefined;
    }

    Object.values(this.players).forEach((player) => {
      const removedLines = player.updateState();

      if (removedLines) {
        Object.values(this.players).forEach((p) => {
          if (player.id !== p.id) {
            p.addPenaltyLine(removedLines);
          }
        });
      }

      if (player.updateState()) {}
      states[player.id] = {
        field: player.field,
        isAlive: player.isAlive,
      };
    });

    return {
      id: this.id,
      states,
      status: 200,
    };
  }

  playerAction(action, id) {
    const states = {};
    const removedLines = this.players[id].action(action);

    Object.values(this.players).forEach((player) => {
      if (removedLines && player.id !== p.id) {
        p.addPenaltyLine(removedLines);
      }
      states[player.id] = {
        field: player.field,
        isAlive: player.isAlive,
      };
    });

    return {
      id: this.id,
      states,
      status: 200,
    };
  }
}

module.exports = Game;
