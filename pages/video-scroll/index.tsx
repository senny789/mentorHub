import React, { useEffect, useRef } from "react";

const Video = () => {
	const canvasRef = useRef<any>();
	const contextRef = useRef<any>();
	const sccrollTopRef = useRef<any>();
	const totalFrames = 115;
	useEffect(() => {
		contextRef.current = canvasRef?.current?.getContext("2d");
		const img = new Image();

		img.src = "/scrollImages/0288.jpg";
		img.onload = () => {
			canvasRef.current.width = window.innerWidth;
			canvasRef.current.height = window.innerHeight;
			contextRef.current.drawImage(
				img,
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
		};
		const getImageName = (index: number) =>
			`/scrollImages/${index.toString().padStart(4, "0")}.jpg`;
		const preloadImages = () => {
			const imagePromises = [];
			for (let i = 288; i < 288 + totalFrames; i++) {
				const img = new Image();
				const imgPromise = new Promise((resolve, reject) => {
					img.onload = () => resolve(img);
					img.onerror = () => reject("image load failed");
				});
				imagePromises.push(imgPromise);
				img.src = getImageName(i);
			}
			return Promise.all(imagePromises);
		};
		const updateImage = (ind: number) => {
			img.src = getImageName(ind);
			contextRef.current.drawImage(
				img,
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
		};
		const handleScroll = () => {
			sccrollTopRef.current = document.documentElement.scrollTop;
			const maxScrollDistance =
				document.documentElement.scrollHeight - window.innerHeight;
			const fractionScrolled = sccrollTopRef.current / maxScrollDistance;
			const imageIndex = Math.min(
				288 + totalFrames,
				Math.ceil(fractionScrolled * (2 * totalFrames + 288))
			);
			requestAnimationFrame(() => updateImage(imageIndex));
		};
		preloadImages();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<div className="min-h-screen w-screen bg-black text-white ">
			<div className="p-10 h-[800vh]">
				<h1 className="text-3xl">Dance</h1>
				<div className="relative h-[700vh]">
					<div className="sticky top-0">
						<canvas ref={canvasRef} className="bg-blue-100"></canvas>
					</div>
				</div>
				<div>
					<h1 className="text-3xl">End</h1>
				</div>
			</div>
		</div>
	);
};

export default Video;
