import { render } from "preact";
import "./style.css";

export function App() {
	const messages = Array(20).fill(0);

	return (
		<main>
			<div className="w-[432px] p-2 flex flex-col gap-2">
				<div className="overflow-y-scroll h-96 border border-solid rounded-lg p-2">
					{messages.map(() => (
						<Message />
					))}
				</div>
				<input className="border border-solid rounded-md bg-white py-1 px-2" placeholder="send a message" />
			</div>
		</main>
	);
}

const Message = ({ username, message }: { username?: string; message?: string }) => {
	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	const usernameStyle = { color: randomColor };

	const usernameFallback = "user" + Math.floor(Math.random() * 1000);

	const messages = [
		"hey everyone! wheres everyone tuning in from?",
		"can you turn up the audio a bit? its hard to hear.",
		"i love this topic! been looking forward to this stream all week.",
		"quick question: what software are you using for this demo?",
		"can you explain that last part again? i missed it!",
		"shoutout to the host for doing such a great job!",
		"is anyone else getting lag, or is it just me?",
		"this is exactly what i needed for my project!",
		"host, whats the name of the book you mentioned?",
		"can you recommend resources for beginners?",
		"wow, the chat is going so fast! hard to keep up!",
		"thanks for explaining that! super helpful.",
		"when the next livestream scheduled?",
		"ive been struggling with this same issue for weeks!",
		"hey mods, can you drop the link to the document in the chat?",
	];

	const messageFallback = messages[Math.floor(Math.random() * messages.length)];

	return (
		<p className="text-left">
			<b href="#" className="font-semibold pr-1.5" style={usernameStyle}>
				{username || usernameFallback}
			</b>
			{message || messageFallback}
		</p>
	);
};

render(<App />, document.getElementById("app"));
