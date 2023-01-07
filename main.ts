import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'attachments'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		var hide_object = document.querySelectorAll('div[class^="nav-folder"] > [data-path="附件"]')[0].setAttribute('style', 'display:none');
		console.log(this.settings.mySetting)
	}

	onunload() {
		var hide_object = document.querySelectorAll('div[class^="nav-folder"] > [data-path="附件"]')[0].removeAttribute('style');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: '设置隐藏附件文件夹'});

		new Setting(containerEl)
			.setName('附件文件夹路径')
			.setDesc('附件文件夹路径默认是attachments。还需要配合设置“文件与链接->附件文件来路径”使用。')
			.addText(text => text
				.setPlaceholder('例：文件夹 1/文件夹2')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
