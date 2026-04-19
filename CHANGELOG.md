# Changelog

## [0.0.3] - 2026-02-26

### Added

#### SlashService
- Introduced a service for managing **Slash Commands**, including **command extraction** and other planned features.

### Updated

#### Application
- Added a new object for managing **application Slash Commands**.
- Added methods to **register global commands** and **register commands for specific guilds**.
- Added a method to **listen for Slash Command interactions**.

---

## [0.0.4] - 2026-02-27

### Fixed
- Fixed minor bugs from the previous release.

---

## [0.0.5] - 2026-03-11

### Updated

#### Application
- **New method `Application.connect()`**  
  Logs the client in and starts the application's **WebSocket server**.

- **Deprecated `slashCommands.listenCommands()`**  
  This method is deprecated and may be removed in future releases.

- **New method `slashCommands.listen()`**  
  Listens for **Slash Command interactions** with improved control and precision.  
  Documentation and examples available on [GitHub](https://github.com/FluxoArts/Disfox).

- **New `Application.events` class**  
  Provides access to the application's **event system**.  
  Documentation and examples available on [GitHub](https://github.com/FluxoArts/Disfox).

- **New method `events.listenEvents()`**  
  Allows listening to **Discord events** through the application event system.

- **New methods for `Application.actions`:**  
  - `.getAvatar()`  
  - `.getAvatarUrl()`

### SlashService
- **Deprecated:** `SlashService.extractSlashCommands()`  
- **New methods:**  
  - `SlashService.extractFile()`  
  - `SlashService.extractDir()`

### Added

#### EventService
- Introduced a service for handling **Discord events**.  
- Structured event extraction ensures **valid and well-organized event data**.  
- Documentation and examples available on [GitHub](https://github.com/FluxoArts/Disfox).

#### DisfoxError (Internal)
- Internal error class still in testing phase.

Disfox is now available on GitHub with **documentation, examples, and TypeScript source code**: [https://github.com/FluxoArts/Disfox](https://github.com/FluxoArts/Disfox)

## [0.0.5-b] - 2026-03-12

### Fixed
- Fixed extraction bugs in **SlashService**.
- Fixed extraction bugs in **EventService**.
- Fixed bugs when deploying **Slash Commands**.

## [0.0.5-c] - 2026-03-13

### Fixed
- Fixed unwanted debug logs.

## [0.0.6] - 2026-04-12

### Fixed
- Fixed bugs when deploying and listening **Slash Commands**.

## [0.0.7] - 2026-04-??

### Releases

#### New Disfox Model
We are introducing a **new model for structuring application systems**, called the **Disfox Model**.  
> It is based on a Component-Based Architecture, focusing on reusable and modular components.

#### New Structure: SlashCommands
Slash commands can now be organized in a more structured and modular way.  
We’ve also introduced new concepts like *marks/tags* to improve how commands are defined and managed.

You can check the full documentation for **SlashService Command** and the **Disfox Model** [here](https://disfox.netlify.app/doc?doc=SlashService#topic-6).

#### Internal Optimizations
Several internal improvements have been made, resulting in better performance and overall efficiency.

#### Official Documentation
Disfox now has its own official documentation website, available at:  
https://disfox.netlify.app
