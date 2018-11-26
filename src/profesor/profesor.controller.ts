import { Controller, Delete, Put, Get, Post, Logger, Render, Body, Param, Res, Req } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDTO } from './profesor.dto';

@Controller('profesor')
export class ProfesorController {

    private logger = new Logger('ProfesorController');

    constructor(private profesorService: ProfesorService){}

    @Get('index')
    //@UseGuards(new AuthGuard())
    @Render('Profesor/index')
    async showAllProfesores(){
        const  profesores = await this.profesorService.showAll();
        return {profesores};
    }

    //Create GET

    @Get('create')    
    @Render('Profesor/create')
    async showProfesores(){
        const  profesores = await this.profesorService.showAll();
        return {profesores};
    }

    //Create POST

    @Post('create')
    createProfesor(@Body() data: ProfesorDTO, @Res() res){
        this.logger.log(JSON.stringify(data));
        this.profesorService.create(data);
        res.redirect('index');  
    }

    //Update GET

    @Get('update/:id')
    @Render('Profesor/update')
    readProfesor(@Param('id') id: number){
        const profesores = this.profesorService.read(id);
        return {profesores};
    }

    //Update POST

    @Put('update/:id')
    updateProfesor(@Param('id') id: number, @Body() data: Partial<ProfesorDTO>, @Req() req, @Res() res){
        this.logger.log(JSON.stringify(data));
        req.query.method == 'update';
        this.profesorService.update(id, data);
        res.redirect('index');
    }

    @Delete('delete/:id')
    destroyCurso(@Param('id') id:number, @Req() req, @Res() res){
        req.query.method == 'delete';
        this.profesorService.destroy(id);
        res.redirect('index');
    }
}
