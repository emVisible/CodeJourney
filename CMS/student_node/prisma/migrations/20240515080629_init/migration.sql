-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `c_id` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `redit` INTEGER NOT NULL,
    `hours` INTEGER NOT NULL,
    `t_id` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `t_id` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `gender` TEXT NOT NULL,
    `title` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `s_id` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `gender` TEXT NOT NULL,
    `cl_id` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cl_id` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `remark` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `c_id` TEXT NOT NULL,
    `cl_id` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
