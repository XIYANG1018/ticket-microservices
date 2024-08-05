import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({ //Omit<TDocument, '_id'> 表示 document 参数是 TDocument 类型，但去除了 _id 属性。这样做的目的是在创建文档时自动生成 _id。
          ...document,
          _id: new Types.ObjectId(), //创建一个新的 Mongoose 文档实例，使用传入的 document 数据，并生成一个新的 ObjectId 作为 _id。
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument; //保存文档并将其转换为 JSON 格式，然后通过类型断言将其转换回 TDocument 类型。这是因为 save() 方法返回的是 Mongoose 文档的实例，不是简单的 JavaScript 对象。
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true);
        if (!document) {
          this.logger.warn(`Document not found: ${JSON.stringify(filterQuery)}`);
          throw new NotFoundException('Document not found');
        }

        return document;
    }

    async findOneAndUpdate(
      filterQuery: FilterQuery<TDocument>,
      update: UpdateQuery<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
          new: true,
        }).lean<TDocument>(true);
        
        if (!document) {
          this.logger.warn(`Document not found: ${JSON.stringify(filterQuery)}`);
          throw new NotFoundException('Document not found');
        }

        return document;
      }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true);

    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }

}

//这段代码定义了一个 AbstractRepository 抽象类，用于处理 Mongoose 数据模型的基本操作。