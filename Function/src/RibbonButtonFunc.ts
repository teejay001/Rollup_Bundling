/* eslint-disable no-undef */
Office.initialize = () => {};

const openBrowserWindow = (url: string) => {
	if (Office.context.requirements.isSetSupported('OpenBrowserWindowApi', '1.1')) {
		Office.context.ui.openBrowserWindow(url);
	} else {
		window.open(url);
	}
};

const launchWebReaderBrowserPage = async (event: any) => {
	openBrowserWindow('https://reader.egress.com');
	event.completed();
};

const launchSentPackageBrowserPage = (event: any) => {
	openBrowserWindow('https://switch.egress.com/ui/admin/browse.aspx');
	event.completed();
};

Office.actions.associate('launchWebReader', launchWebReaderBrowserPage);
Office.actions.associate('launchSentPackage', launchSentPackageBrowserPage);
