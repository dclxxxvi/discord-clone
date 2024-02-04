"use client";

import * as React from 'react';
import "@livekit/components-styles"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

interface Props {
	chatId: string;
	video: boolean;
	audio: boolean;
}

const MediaRoom: React.FC<Props> = ({
	chatId,
	video,
	audio
}) => {
	const {user} = useUser();
	const [token, setToken] = useState("");

	useEffect(() => {
		const name = `${user?.firstName || 'Башка'} ${user?.lastName || 'Говяжья'}`;

		(async () => {
			try {
				const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
				const data = await response.json();
				setToken(data.token);
				console.log(data)
			} catch (e) {
				console.log(e)
			}
		})()
	}, [user?.firstName, user?.lastName, chatId]);

	if (token === '') {
		return <div className={'flex flex-col flex-1 justify-center items-center'}>
			<Loader2 className={'h-7 w-7 text-zinc-500 animate-spin my-4'}/>
			<p className={'text-xs text-zinc-500 dark:text-zinc-400'}>
				Loading...
			</p>
		</div>
	}

	return (
		<LiveKitRoom
			data-lk-theme={'default'}
			serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
			token={token}
			connect={true}
			video={video}
			audio={audio}
		>
			<VideoConference />
		</LiveKitRoom>
	);
};

export default MediaRoom;