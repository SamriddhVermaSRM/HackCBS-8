'use client';

import { Lesson, LessonLog } from '@/types/types';
import {
	Dispatch,
	FormEvent,
	useEffect,
	useEffectEvent,
	useState,
	useRef,
} from 'react';

function Lessons({
	currentLesson,
	currentLessonId,
	setCurrentLessonId,
	setLessonInfo,
	moduleId,
}: {
	currentLesson: Lesson;
	currentLessonId: number;
	setCurrentLessonId: Dispatch<React.SetStateAction<number>>;
	setLessonInfo: Dispatch<React.SetStateAction<LessonLog | null>>;
	moduleId: string;
}) {
	const [loadedAt, setLoadedAt] = useState<number | null>(null);
	const setLoadingTime = useEffectEvent(() => {
		setLoadedAt(Date.now());
	});
	const [isVoiceLoading, setIsVoiceLoading] = useState<boolean>(false);
	const [url, setUrl] = useState<string>('');
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);

	const getVoice = async () => {
		console.log('voice call');
		setIsVoiceLoading(true);
		try {
			const response = await fetch('https://api.murf.ai/v1/speech/generate', {
				method: 'POST',
				headers: {
					'api-key': `${process.env.NEXT_PUBLIC_MURF_API}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: `${currentLesson.message}`,
					voiceId: 'en-US-natalie',
					pronunciationDictionary: {
						'2010': {
							pronunciation: 'two thousand and ten',
							type: 'SAY_AS',
						},
						live: {
							pronunciation: 'laɪv',
							type: 'IPA',
						},
					},
				}),
			});
			const body = await response.json();
			console.log(body.audioFile);
			if (body.audioFile) {
				setUrl(body.audioFile);
			}
		} catch (error) {
			console.error('Error generating voice:', error);
		} finally {
			setIsVoiceLoading(false);
		}
	};

	useEffect(() => {
		setLoadingTime();
		getVoice();
	}, [currentLessonId]);

	// When a new audio URL is set, show the audio preloader until the
	// audio reports it's ready to play. This is UI-only: it doesn't change
	// lesson flow or network behaviour.
	useEffect(() => {
		if (url) {
			setIsAudioLoading(true);
		} else {
			setIsAudioLoading(false);
		}
	}, [url]);

	const handleClick = () => {
		if (!currentLesson.end) {
			setCurrentLessonId(currentLessonId + 1 + (currentLesson.next || 0));
		}
		const info = {
			answerTime: Date.now() - loadedAt!,
			module_id: moduleId,
			lesson_id: currentLessonId,
			timestamp: new Date().toISOString(),
		};
		setLessonInfo(info);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const ans = data.get('ans') as string;
		console.log(currentLesson.choices[0].next);

		if (ans === currentLesson.choices[0].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[0].next);
		} else if (ans === currentLesson.choices[1].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[1].next);
		} else if (ans === currentLesson.choices[2].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[2].next);
		} else if (ans === currentLesson.choices[3].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[3].next);
		} else if (ans === currentLesson.choices[4].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[4].next);
		} else if (ans === currentLesson.choices[5].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[5].next);
		} else if (ans === currentLesson.choices[6].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[6].next);
		} else if (ans === currentLesson.choices[7].message) {
			setCurrentLessonId((prev) => prev + currentLesson.choices[7].next);
		}

		const info = {
			answerTime: Date.now() - loadedAt!,
			module_id: moduleId,
			lesson_id: currentLessonId,
			timestamp: new Date().toISOString(),
		};
		setLessonInfo(info);
	};

	if (currentLesson.choices) {
		return (
			<div className='min-h-screen flex'>
				{/* Left: content (form, audio, question, answers) */}
				<div className='w-1/2 flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100'>
					<form
						className='w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200 '
						onSubmit={handleSubmit}
					>
						{/* Audio Player */}
						{isVoiceLoading && (
							<div className='mb-6 p-3 bg-blue-100 border border-blue-300 rounded-md flex items-center gap-2'>
								<div className='animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full'></div>
								<span className='text-sm text-blue-700'>Loading voice...</span>
							</div>
						)}

						{url && !isVoiceLoading && (
							<div className='mb-6 bg-gray-100 p-4 rounded-md relative'>
								{isAudioLoading && (
									<div className='absolute inset-0 bg-white/60 rounded-md flex items-center justify-center z-10'>
										<div className='flex items-center gap-2'>
											<div className='animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full'></div>
											<span className='text-sm text-blue-700'>
												Loading audio...
											</span>
										</div>
									</div>
								)}
								<audio
									ref={audioRef}
									controls
									className='w-full'
									src={url}
									onCanPlayThrough={() => setIsAudioLoading(false)}
									onLoadedMetadata={() => setIsAudioLoading(false)}
								/>
							</div>
						)}

						{/* Question */}
						<div className='mb-6'>
							<h2 className='text-xl font-bold text-gray-800 mb-4'>
								{currentLesson.message}
							</h2>
						</div>

						{/* Answer Options */}
						<div className='space-y-3 mb-6  '>
							{Array.isArray(currentLesson.choices) &&
							currentLesson.choices.length > 0 ? (
								currentLesson.choices.map((choice, i) => (
									<label
										key={i}
										className='flex items-center p-4 border  border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition'
									>
										<input
											type='radio'
											name='ans'
											className='w-4 h-4 cursor-pointer'
											value={choice.message}
											// mark the first radio as required so the group is required
											required={i === 0}
										/>
										<span className='ml-3 text-gray-700 font-medium'>
											{choice.message}
										</span>
									</label>
								))
							) : (
								<div className='text-sm text-gray-500'>
									No choices available.
								</div>
							)}
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition'
						>
							Submit Answer
						</button>
					</form>
				</div>

				{/* Right: visual/background image */}
				<div
					className='w-1/2 hidden md:block'
					style={{
						background: `url(/lessons/${currentLesson.speaker}.png) center/cover no-repeat`,
					}}
				/>
			</div>
		);
	} else {
		return (
			<div className='min-h-screen flex'>
				{/* Left: clickable content for bacche */}
				<div className='w-1/2 flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-100'>
					<div
						className='bacche cursor-pointer group w-full max-w-md'
						onClick={handleClick}
					>
						<div className='text-center mb-6 bg-white p-4 rounded-lg shadow-md'>
							<h2 className='text-xl font-bold text-gray-800'>
								{currentLesson.message}
							</h2>
						</div>
						<div className='relative'>
							{url && !isVoiceLoading && (
								<div className='mb-6 bg-gray-100 p-4 rounded-md relative'>
									{isAudioLoading && (
										<div className='absolute inset-0 bg-white/60 rounded-md flex items-center justify-center z-10'>
											<div className='flex items-center gap-2'>
												<div className='animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full'></div>
												<span className='text-sm text-blue-700'>
													Loading audio...
												</span>
											</div>
										</div>
									)}
									<audio
										ref={audioRef}
										controls
										className='w-full'
										src={url}
										onCanPlayThrough={() => setIsAudioLoading(false)}
										onLoadedMetadata={() => setIsAudioLoading(false)}
									/>
								</div>
							)}
							<div className='text-center mt-4 text-gray-600 text-sm'>
								Click to continue
							</div>
						</div>
					</div>
				</div>

				{/* Right: visual/background image for bacche */}
				<div
					className='w-1/2 hidden md:block'
					style={{
						background: `url(/lessons/${currentLesson.speaker}.png) center/cover no-repeat`,
					}}
				/>
			</div>
		);
	}
}

export default Lessons;
