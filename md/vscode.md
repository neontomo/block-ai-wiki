# VSCode

--

## disable AI Chat & autocomplete

1. press the cog wheel in the top right corner

2. go to `Settings`

3. click the `Open settings` icon in the top right corner (a file icon with an arrow)

4. you will now see a long list of settings in code format. add these to the bottom:

`"chat.agent.enabled": false,`

`"chat.disableAIFeatures": true,`

`"chat.extensionTools.enabled": false,`

`"inlineChat.accessibleDiffView": "off",`

`"terminal.integrated.initialHint": false`

**note:** you may need to restart VSCode afterwards

--

## disable AI extensions

1. click the `View` toolbar item

2. click on `Extensions`

3. uninstall any AI extensions you might have installed, such as Copilot

**note:** you may need to restart VSCode afterwards

--

## sources

- [vscode docs release notes v1_104](https://github.com/microsoft/vscode-docs/blob/main/release-notes/v1_104.md#hide-and-disable-github-copilot-ai-features)
- [How to disable all AI stuff in Visual Studio Code](https://leonidboykov.com/how-to-disable-all-ai-stuff-in-visual-studio-code/)