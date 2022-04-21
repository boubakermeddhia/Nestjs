import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../Task-status.enum";


export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase()
        if (this.isvalid(value)) {
            throw new BadRequestException(`"${value}" is an invalid`)
        }
        return value
    }

    private isvalid(status: any) {
        let idx = this.allowedStatus.indexOf(status)
        return idx == -1 ? true : false
    }
}