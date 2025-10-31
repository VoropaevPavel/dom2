import Game from "../app";

describe("Game Class", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="game"></div>';
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test("should create 4x4 game board", () => {
    new Game();
    const cells = document.getElementsByClassName("cell");
    expect(cells.length).toBe(16);
  });

  test("should place gnome in random cell on init", () => {
    const game = new Game();
    const gnome = document.querySelector(".gnome-img");
    expect(gnome).toBeTruthy();
    expect(gnome.parentElement).toBe(game.cells[8]);
  });

  test("should move gnome to new cell on placeGnome call", () => {
    const game = new Game();
    const initialCell = game.gnome.parentElement;

    Math.random.mockReturnValue(0.3);
    game.placeGnome();

    const newCell = game.gnome.parentElement;
    expect(newCell).not.toBe(initialCell);
    expect(newCell).toBe(game.cells[4]);
  });

  test("should start automatic movement with interval", () => {
    jest.useFakeTimers();
    const game = new Game();

    const initialPlace = game.gnome.parentElement;
    Math.random.mockReturnValue(0.6);

    jest.advanceTimersByTime(1000);

    const newPlace = game.gnome.parentElement;
    expect(newPlace).not.toBe(initialPlace);
  });

  test("intervalId is set via setInterval", () => {
    const originalSetInterval = global.setInterval;
    global.setInterval = jest.fn((...args) => {
      return originalSetInterval(...args);
    });

    const game = new Game();

    expect(global.setInterval).toHaveBeenCalled();
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(game.intervalId).not.toBeNull();

    global.setInterval = originalSetInterval;
  });
});
