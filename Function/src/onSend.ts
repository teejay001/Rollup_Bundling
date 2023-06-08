import { OnSendInfoInterface } from '@common/interfaces';
import { logMessage } from '@common/utils/logger';

// eslint-disable-next-line no-undef
Office.onReady();

export default class OnSendHandler {
	static countdownTimer: any;

	static onSendInformation: OnSendInfoInterface = { timeRemaining: 270 };

	private static startCountdownTimer() {
		if (!this.countdownTimer) {
			this.countdownTimer = setInterval(OnSendHandler.updateCountdownTimer, 1000);
		}
	}

	private static updateCountdownTimer() {
		OnSendHandler.onSendInformation.timeRemaining -= 1;
	}

	static async processSendEvent(evt: object | undefined) {
		logMessage (evt as any);
		OnSendHandler.startCountdownTimer();
	}
}
