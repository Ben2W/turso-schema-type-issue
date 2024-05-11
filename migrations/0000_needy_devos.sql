CREATE TABLE `channel` (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text(256) NOT NULL,
	`description` text(512) NOT NULL,
	`channelType` text(256) NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `generatedConversation` (
	`id` integer PRIMARY KEY NOT NULL,
	`channelId` text NOT NULL,
	`summary` text(10000),
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `generatedConversationMessage` (
	`id` integer PRIMARY KEY NOT NULL,
	`messageId` text NOT NULL,
	`conversationId` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`messageId`) REFERENCES `message`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`conversationId`) REFERENCES `generatedConversation`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` integer PRIMARY KEY NOT NULL,
	`channelId` text NOT NULL,
	`userId` text NOT NULL,
	`message` text(60000) NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `unGroupedMessage` (
	`messageId` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`messageId`) REFERENCES `message`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `generatedConversationMessage_messageId_conversationId_unique` ON `generatedConversationMessage` (`messageId`,`conversationId`);