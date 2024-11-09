import { render } from "preact";
import "./style.css";
import { useEffect, useRef, useState } from "preact/hooks";

interface Message {
	username: string;
	message: string;
	color: string;
}

export function App() {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8001");
		ws.onopen = () => {
			console.log("connected to websocket server");
		};
		ws.onmessage = (event) => {
			const message = JSON.parse(event.data) as Message;
			setMessages((prevMessages) => [...prevMessages, message]);
		};
		return () => {
			ws.close();
		};
	}, []);

	useEffect(() => {
		// autoscroll to bottom of chat window
		chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
	}, [messages]);

	const chatContainer = useRef<HTMLDivElement>(null);

	return (
		<main>
			<div className="w-[432px] p-2 flex flex-col gap-2">
				<div ref={chatContainer} className="overflow-y-scroll h-96 border border-solid rounded-lg p-2">
					{/* offset */}
					<div className="h-96" />
					{messages.map((msg, i) => (
						<MessageBlock {...msg} key={i} />
					))}
				</div>
				<input className="border border-solid rounded-md bg-white py-1 px-2" placeholder="send a message" />
			</div>
		</main>
	);
}

const MessageBlock = ({ username, message, color }: Message) => {
	const usernameStyle = { color };

	return (
		<p className="text-left">
			<b href="#" className="font-semibold pr-1.5" style={usernameStyle}>
				{username}
			</b>
			{message}
		</p>
	);
};

render(<App />, document.getElementById("app"));
