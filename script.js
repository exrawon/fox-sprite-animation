window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const CANVAS_WIDTH = (canvas.width = 600);
	const CANVAS_HEIGHT = (canvas.height = 600);
	const userSelect = document.getElementById('user-select');

	const playerImage = player; // html img #player in global scope
	const spriteWidth = 575;
	const spriteHeight = 523;
	let playerState = 'idle';
	let gameFrame = 0;
	const staggeredFrame = 5;
	const spriteAnimations = [];
	const animationStates = [
		{
			name: 'idle',
			frames: 7,
		},
		{
			name: 'jump',
			frames: 7,
		},
		{
			name: 'fall',
			frames: 7,
		},
		{
			name: 'run',
			frames: 9,
		},
		{
			name: 'dizzy',
			frames: 11,
		},
		{
			name: 'sit',
			frames: 5,
		},
		{
			name: 'roll',
			frames: 7,
		},
		{
			name: 'bite',
			frames: 7,
		},
		{
			name: 'faint',
			frames: 12,
		},
		{
			name: 'recoil',
			frames: 4,
		},
	];

	//creating location coordinates for spritesheet
	animationStates.forEach((state, index) => {
		let frames = {
			loc: [],
		};
		for (let i = 0; i < state.frames; i++) {
			let positionX = i * spriteWidth;
			let positionY = index * spriteHeight;
			frames.loc.push({ x: positionX, y: positionY });
		}
		spriteAnimations[state.name] = frames;
	});

	//animation function, drawImage using coordinates from above
	function draw() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		let position =
			Math.floor(gameFrame / staggeredFrame) %
			spriteAnimations[playerState].loc.length;
		let frameX = spriteAnimations[playerState].loc[position].x;
		let frameY = spriteAnimations[playerState].loc[position].y;
		ctx.drawImage(
			playerImage,
			frameX,
			frameY,
			spriteWidth,
			spriteHeight,
			0,
			0,
			spriteWidth,
			spriteHeight
		);

		gameFrame++;
		requestAnimationFrame(draw);
	}
	draw();
	userSelect.addEventListener('change', (e) => {
		playerState = e.target.value;
	});
});
