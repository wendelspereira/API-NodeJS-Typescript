import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { SpecificationRepository } from "@modules/cars/repository/implementations/SpecificationRepository";
import { ISpecificationDTO } from "@modules/cars/repository/ISpecificationRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: SpecificationRepository
    ) {}

    async execute({ name, description }: ISpecificationDTO): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists");
        }

        await this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
