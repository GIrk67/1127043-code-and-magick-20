/* eslint-disable quotes */
"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUDEND_Y = CLOUD_Y + CLOUD_HEIGHT;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_GAP = 20;
var TEXT_HEIGHT = 40;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - TEXT_HEIGHT - TEXT_GAP * 4;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getGeneralText = function (ctx) {
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillText("Ура вы победили!", CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText("Список результатов:", CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_HEIGHT);
};

var getPlayersNames = function (ctx, player, x, y) {
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(player, x, y);
};

var getPlayersTimes = function (ctx, time, x, y) {
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillText(time, x, y);
};

var renderResultCloud = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");
  getGeneralText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    getPlayersNames(ctx, players[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUDEND_Y - TEXT_GAP);

    times[i] = Math.round(times[i]);

    getPlayersTimes(ctx, times[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUDEND_Y - TEXT_GAP * 2 - (barHeight * times[i]) / maxTime - TEXT_GAP);

    ctx.fillStyle = "hsl(240, " + Math.floor(Math.random() * 101) + "%, 50%)";
    if (players[i] === "Вы") {
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
    }

    renderResultCloud(ctx, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUDEND_Y - TEXT_HEIGHT - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};
