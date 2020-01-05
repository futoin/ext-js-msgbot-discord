
# About

**WORK IN PROGRESS**

This is Discord message system support for reference implementation
of FTN22.
    
* Spec: [FTN22: FutoIn Interface - Message Bot](https://specs.futoin.org/draft/preview/ftn22_if_message_bot.html)

Author: [Andrey Galkin](mailto:andrey@futoin.org)


# Installation for Node.js

Command line:
```sh
$ npm install @futoin/msgbot-discord --save
```

    
# API documentation

## Modules

<dl>
<dt><a href="#module_@futoin/ext-js-msgbot-discord">@futoin/ext-js-msgbot-discord</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#DiscordFace">DiscordFace</a></dt>
<dd><p>Discord FTN22 Server Face implementation</p>
</dd>
<dt><a href="#DiscordHelpers">DiscordHelpers</a></dt>
<dd><p>Discord Server-specific helpers</p>
</dd>
<dt><a href="#DiscordService">DiscordService</a></dt>
<dd><p>Discord Server Service</p>
</dd>
</dl>

<a name="module_@futoin/ext-js-msgbot-discord"></a>

## @futoin/ext-js-msgbot-discord
<a name="exp_module_@futoin/ext-js-msgbot-discord--exports"></a>

### exports ⏏
Add Discord system to FutoIn Message Bot

**Kind**: Exported member  

| Param | Type | Description |
| --- | --- | --- |
| asi | <code>AsyncSteps</code> | async steps interface |
| app | <code>ServiceApp</code> | message bot |
| options | <code>object</code> | additional parameters |
| options.discord | <code>object</code> | parameters to be passed to Discord.js |
| options.discordToken | <code>string</code> | bot token |

<a name="DiscordFace"></a>

## DiscordFace
Discord FTN22 Server Face implementation

**Kind**: global class  

* [DiscordFace](#DiscordFace)
    * [new DiscordFace(options)](#new_DiscordFace_new)
    * [.systemIface()](#DiscordFace+systemIface) ⇒ <code>object</code>

<a name="new_DiscordFace_new"></a>

### new DiscordFace(options)
C-tor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | common options |
| options.discordClient | <code>object</code> | Discord client instance |

<a name="DiscordFace+systemIface"></a>

### discordFace.systemIface() ⇒ <code>object</code>
Get native message system interface implementation

**Kind**: instance method of [<code>DiscordFace</code>](#DiscordFace)  
**Returns**: <code>object</code> - native implementation  
<a name="DiscordHelpers"></a>

## DiscordHelpers
Discord Server-specific helpers

**Kind**: global class  

* [DiscordHelpers](#DiscordHelpers)
    * [.bold(str)](#DiscordHelpers+bold) ⇒ <code>string</code>
    * [.italic(str)](#DiscordHelpers+italic) ⇒ <code>string</code>
    * [.color(str, hexcolor)](#DiscordHelpers+color) ⇒ <code>string</code>
    * [.imgUrl(url)](#DiscordHelpers+imgUrl) ⇒ <code>string</code>
    * [.emoji(name)](#DiscordHelpers+emoji) ⇒ <code>string</code>
    * [.line()](#DiscordHelpers+line) ⇒ <code>string</code>
    * [.menion(ext_id)](#DiscordHelpers+menion) ⇒ <code>string</code>

<a name="DiscordHelpers+bold"></a>

### discordHelpers.bold(str) ⇒ <code>string</code>
Get bold text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - bold output  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | input |

<a name="DiscordHelpers+italic"></a>

### discordHelpers.italic(str) ⇒ <code>string</code>
Get italic text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - italic output  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | input |

<a name="DiscordHelpers+color"></a>

### discordHelpers.color(str, hexcolor) ⇒ <code>string</code>
Get colored text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - colored output  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | input |
| hexcolor | <code>string</code> | color code |

<a name="DiscordHelpers+imgUrl"></a>

### discordHelpers.imgUrl(url) ⇒ <code>string</code>
Get image URL embedded into text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - URL output  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | input |

<a name="DiscordHelpers+emoji"></a>

### discordHelpers.emoji(name) ⇒ <code>string</code>
Get emoji embedded into text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - emoji output  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | input |

<a name="DiscordHelpers+line"></a>

### discordHelpers.line() ⇒ <code>string</code>
Get new line

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - new line  
<a name="DiscordHelpers+menion"></a>

### discordHelpers.menion(ext_id) ⇒ <code>string</code>
Get actor mention into text

**Kind**: instance method of [<code>DiscordHelpers</code>](#DiscordHelpers)  
**Returns**: <code>string</code> - mention output  

| Param | Type | Description |
| --- | --- | --- |
| ext_id | <code>string</code> | input actor ID |

<a name="DiscordService"></a>

## DiscordService
Discord Server Service

**Kind**: global class  
<a name="new_DiscordService_new"></a>

### new DiscordService(options)
C-tor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | common options |
| options.discordClient | <code>object</code> | Discord client instance |
| options.asModel | <code>AsyncSteps</code> | AsyncSteps model to create threads |
| options.ccm | <code>AdvancedCCM</code> | CCM |



*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*.


