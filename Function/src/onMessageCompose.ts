import { RecipientType } from '@common/enums';

const getRestIdFromItemId = (itemId: string) => Office.context.mailbox.convertToRestId(
	itemId,
	Office.MailboxEnums.RestVersion.v2_0
);

const initializeSessionData = (itemId: string): void => {
	const restId = getRestIdFromItemId(itemId);
	Office.context.mailbox.item?.sessionData.setAsync(restId, JSON.stringify([]));
};

function updateItemCustomPropertiesAsync(itemId: string, originalRecipients: any[]): void {
	Office.context.mailbox.item?.loadCustomPropertiesAsync((asyncResult) => {
		if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
			const customProps = asyncResult.value;
			customProps.set('original-mailbox', Office.context.mailbox.userProfile.emailAddress);
			customProps.set('original-recipients', JSON.stringify(originalRecipients));
			customProps.set('item-id', itemId);
			customProps.saveAsync();
		}
	});
}

const getItemRecipientsAsync = async (recipientType: RecipientType)
: Promise<Office.EmailAddressDetails[]> => {
	const mailItem = <Office.MessageCompose>Office.context.mailbox.item;
	return new Promise((resolve, reject) => {
		mailItem[recipientType].getAsync((asyncResult) => {
			if (asyncResult.status === Office.AsyncResultStatus.Failed) {
				reject(asyncResult.error);
			} else {
				resolve(asyncResult.value);
			}
		});
	});
};

const formatRecipient = (allRecipients: Office.EmailAddressDetails[], type: number) => {
	const recipients: any[] = [];
	for (let i = 0; i < allRecipients.length; i += 1) {
		const recipient: any = {
			display: allRecipients[i].displayName,
			email: allRecipients[i].emailAddress,
			type
		};
		recipients.push(recipient);
	}
	return recipients;
};

const getOriginalRecipients = async (): Promise<any[]> => {
	const allRecipients: any[] = [];
	const toRecipients = await getItemRecipientsAsync(RecipientType.to);
	const ccRecipients = await getItemRecipientsAsync(RecipientType.cc);
	const bccRecipients = await getItemRecipientsAsync(RecipientType.bcc);

	allRecipients.push(...formatRecipient(toRecipients, 1),
		...formatRecipient(ccRecipients, 2),
		...formatRecipient(bccRecipients, 3));

	return allRecipients;
};

async function processMessageComposeEvent(): Promise<void> {
	const originalRecipients = await getOriginalRecipients();
	Office.context.mailbox.item?.saveAsync((asyncResult) => {
		if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
			updateItemCustomPropertiesAsync(asyncResult.value, originalRecipients);
			initializeSessionData(asyncResult.value);
		}
	});
}

Office.actions.associate('processMessageComposeEvent', processMessageComposeEvent);