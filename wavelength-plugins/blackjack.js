/******************************
* Black Jack By JD and Panpawn *
* Modified for surge by Prince Sky *
*******************************/
'use strict';

const CARD_IMAGE_PATH = `http://goldservers.info:${Config.port}/cards/`;

class Blackjack extends Rooms.RoomGame {
	constructor(room, user, target) {
		super(room);
		this.room = room;

		this.turnTimeoutMinutes = 1;
		this.timerTickSeconds = 5;

		this.blackjackNumber = 0;
		this.createdBy = user.name;
		this.startedBy = '';
		this.allowRenames = true;

		this.playerCap = 16;
		this.minimumPlayers = 2;
		this.playerScrollWheel = 4;

		this.spectators = Object.create(null);
		this.dealer = new BlackjackDealer();

		this.symbols = {
			'♥': 'H',
			'♦': 'D',
			'♣': 'S',
			'♠': 'C',
		};
		this.deck = new BlackjackDeck().shuffle();

		this.id = this.room.id;
		this.title = 'Blackjack';
		this.started = false;
		this.state = 'signups';
		this.lastMessage = '';
		this.uhtmlChange = '';
		this.curUser = '';
		this.infoboxLimited = '';

		this.joinButton = '<button class="button" name="send" value="/joingame" title="Join Blackjack">Join Blackjack</button>';
		this.spectateButton = '<button class="button" name="send" value="/blackjack spectate" title="Spectate Blackjack">Spectate</button>';
		this.slideButton = '<button class="button" name="send" value="/blackjack slide" title="Slide the game log down in the chat">(<i class="fa fa-arrow-down" aria-hidden="true"></i> slide)</button>';
		this.atLeastOneJoin = false;

		this.madeGame(target);
}
