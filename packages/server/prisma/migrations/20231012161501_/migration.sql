-- CreateTable
CREATE TABLE `admin_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `user_id` INTEGER NULL,
    `action` VARCHAR(50) NULL,
    `ip` VARCHAR(20) NULL,
    `ip_address` VARCHAR(300) NULL,
    `receipt` INTEGER NULL DEFAULT 1,
    `receipt_desc` VARCHAR(300) NULL,
    `path` VARCHAR(255) NULL,
    `user_agent` VARCHAR(255) NULL,
    `params` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    `neckname` VARCHAR(50) NULL,
    `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `nickname` VARCHAR(50) NULL,
    `password` VARCHAR(100) NULL,
    `avatar` VARCHAR(100) NULL,
    `mobile` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `status` TINYINT NULL DEFAULT 1,
    `is_root` TINYINT NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `account`(`nickname`),
    UNIQUE INDEX `mobile`(`mobile`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `baseentity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_manage_page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page_name` VARCHAR(50) NOT NULL,
    `page_path` VARCHAR(100) NOT NULL,
    `page_title` VARCHAR(50) NOT NULL,
    `role` VARCHAR(10) NOT NULL DEFAULT 'normal',
    `vip_level` INTEGER NULL,
    `status` INTEGER NULL DEFAULT 1,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_name` VARCHAR(50) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `material_type` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `group_id      Int` INTEGER NOT NULL,

    UNIQUE INDEX `path`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(50) NOT NULL,
    `sort` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `group_name`(`group_name`),
    UNIQUE INDEX `sort`(`sort`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `privacy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `content` MEDIUMTEXT NOT NULL,
    `platform` VARCHAR(10) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `remark` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_circle_classify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classify_name` VARCHAR(50) NOT NULL,
    `sort` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `classify_name`(`classify_name`),
    UNIQUE INDEX `sort`(`sort`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_circle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `icon` VARCHAR(255) NOT NULL,
    `cover` VARCHAR(255) NOT NULL,
    `creator_id` INTEGER NULL,
    `creator_name` VARCHAR(50) NOT NULL,
    `classify_id` INTEGER NULL,
    `classify_name` VARCHAR(50) NULL,
    `desc` VARCHAR(255) NOT NULL,
    `member_title` VARCHAR(50) NOT NULL,
    `followers` INTEGER NULL DEFAULT 0,
    `v_followers` INTEGER NULL DEFAULT 0,
    `rule` VARCHAR(255) NOT NULL,
    `guide` TINYINT NULL DEFAULT 0,
    `status` TINYINT NULL DEFAULT 0,
    `banned_reason` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
