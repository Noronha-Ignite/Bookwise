-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `CategoriesOnBooks` ADD CONSTRAINT `CategoriesOnBooks_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnBooks` ADD CONSTRAINT `CategoriesOnBooks_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
