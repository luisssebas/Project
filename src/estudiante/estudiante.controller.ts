import { Controller, Put, Delete, Get, Post, Logger, Render, Body, Param, Res, Req } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CursoService } from 'curso/curso.service';
import { EstudianteDTO } from './estudiante.dto';

@Controller('estudiante')
export class EstudianteController {

    private logger = new Logger('EstudianteController');

    constructor(private estudianteService: EstudianteService, private cursoService: CursoService){}

    @Get('index')
    //@UseGuards(new AuthGuard())
    @Render('Estudiante/index')
    async showAllEstudiantes(){
        const  estudiantes = await this.estudianteService.showAll();
        return {estudiantes};
    }

    //Create GET

    @Get('create')    
    @Render('Estudiante/create')
    async showEstudiantes(){
        const  estudiantes = await this.estudianteService.showAll();
        const cursos = await this.cursoService.showAll();
        return {estudiantes, cursos};
    }

    //Create POST

    @Post('create')
    createEstudiante(@Body() data: EstudianteDTO, @Res() res){
        this.logger.log(JSON.stringify(data));
        this.estudianteService.create(data);
        res.redirect('index');
    }

    //Update GET

    @Get('update/:id')
    @Render('Estudiante/update')
    async readEstudiante(@Param('id') id: number){
        const cursos = await this.cursoService.showAll();
        const estudiantes = await this.estudianteService.read(id);
        return {estudiantes,cursos};
    }

    //Update POST

    @Post('update/:id')
    updateEstudiante(@Param('id') id: number, @Body() data: Partial<EstudianteDTO>, @Req() req, @Res() res){
        this.logger.log(JSON.stringify(data));
        req.query.method == 'update';
        this.estudianteService.update(id, data);
        res.redirect('index'); 
    }

    //Delete POST

    @Delete('delete/:id')
    destroyEstudiante(@Param('id') id:number, @Req() req, @Res() res){
        req.query.method == 'delete';
        this.estudianteService.destroy(id);
        res.redirect('index'); 
    }
}
