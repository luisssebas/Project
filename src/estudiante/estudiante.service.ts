import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteDTO } from './estudiante.dto';
import { CursoEntity } from 'curso/curso.entity';

@Injectable()
export class EstudianteService {

    constructor(@InjectRepository(EstudianteEntity) 
    private estudianteRepository: Repository<EstudianteEntity>,
    @InjectRepository(CursoEntity)
    private cursoRepository:Repository<CursoEntity>
    ){}


    async showAll(){
        return await this.estudianteRepository.find({relations: ['cursos']});
    }

    async create(data){
        const curso = await this.cursoRepository.findOne({where: {id: data.cursos}});
        const estudiante = await this.estudianteRepository.create({...data, cursos: curso});
        await this.estudianteRepository.save(estudiante);
        return estudiante;
    }

    async read(id: number){
        const estudiante = await this.estudianteRepository.findOne({where: {id}});
        if(!estudiante){
            throw new HttpException('Not foud', HttpStatus.NOT_FOUND);
        }
        return estudiante;
    }

    async update(id: number, data: Partial<EstudianteDTO>){
        let estudiante = await this.estudianteRepository.findOne({where: {id}});
        if(!estudiante){
            throw new HttpException('Not foud', HttpStatus.NOT_FOUND);
        }
        await this.estudianteRepository.update({id}, data);
        estudiante = await this.estudianteRepository.findOne({where: {id}});
        return estudiante;
    }

    async destroy(id: number){
        const estudiante = await this.estudianteRepository.findOne({where: {id}});
        if(!estudiante){
            throw new HttpException('Not foud', HttpStatus.NOT_FOUND);
        }
        await this.estudianteRepository.delete({id});
        return estudiante;
    }
}
