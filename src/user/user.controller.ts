import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdvanceService } from 'src/advance/advance.service';
import { CreateAdvanceDto, EditAdvanceDto } from 'src/advance/dtos';
import { AdvancePlanService } from 'src/advancePlan/advancePlan.service';
import { CreateAdvancePlanDto, EditAdvancePlanDto } from 'src/advancePlan/dtos';
import { BranchService } from 'src/branch/branch.service';
import { GalleryService } from 'src/galleries/gallery.service';
import { CreatePaymentconceptDto, EditPaymentconceptDto } from 'src/payment-concept/dtos';
import { PaymentConceptService } from 'src/payment-concept/paymentconcept.service';
import { CreatePaymentDto, EditPaymentDto } from 'src/payment/dtos';
import { PaymentService } from 'src/payment/payment.service';
import { Auth } from '../common/decorators';
import { DataHealthService } from '../data-health/datahealth.service';
import { CreateDatahealthDto, EditDatahealthDto } from '../data-health/dto';
import { DiseaseService } from '../disease/disease.service';
import { CreateGaleryDto } from '../galleries/dtos';
import { InterventionService } from '../intervention/intervention.service';
import { CreateParentDto, EditParentDto } from '../parents/dtos';
import { ParentService } from '../parents/parents.service';
import { CreateResponsibleSignDto } from '../responsible-sign/dto';
import { ResponsibleSignService } from '../responsible-sign/responsible_sign.service';
import { CreateUserDetailsDto, EditUserDetailsDto } from '../user-details/dto';
import { UserDetailsService } from '../user-details/user_details.service';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';
import * as PdfPrinter from 'pdfmake';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';
import { RoleGuard } from 'src/auth/guards';
import { AppResource } from 'src/app.roles';
import { CreatePersonalDetailsDto, EditPersonalDetailsDto } from 'src/personal-details/dto';
import { CreateUserPersonalDto } from './dtos/create-user_personal.dto';
import { AuthService } from 'src/auth/auth.service';
import { EditUserPersonalDto } from './dtos/edit-user_personal.dto';
import { Console } from 'console';
import { CreateBranchDto } from 'src/branch/dto';
import { MysqlModule } from 'src/mysql.module';

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly parentService: ParentService,
        private readonly userDetailsService: UserDetailsService,
        private readonly dataHealthService: DataHealthService,
        private readonly responsibleSignService: ResponsibleSignService,
        private readonly galleryService: GalleryService,
        private readonly paymentService:PaymentService,
        private readonly paymentconceptService:PaymentConceptService,
        private readonly advancePlanService:AdvancePlanService,
        private readonly advanceService:AdvanceService,
        private readonly datahealthSrvice: DataHealthService,
        // private readonly authService: AuthService,
        

        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) { }

    @Auth()
    @Get()
    async getMany() {
        const data = await this.userService.getMany();
        return {
            message: "Usuarios Cargados",
            data: data
        }
    }

    @UseGuards(RoleGuard)
    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.userService.getOne(id);
        return {
            message: "Usuario Cargado",
            data: data
        }
    }

    @Post()
    async createOne(
        @Body() dtoUser: CreateUserDto,
        @Body("parents") dtoParent: CreateParentDto[],
        @Body("userDetails") dtoDetails: CreateUserDetailsDto,
        @Body("responsibleSign") dtoresponsibleSign: CreateResponsibleSignDto,
        @Body("dataHealth") dtoDatahealth: CreateDatahealthDto,
        @Body("profileImage") dtoGalery: CreateGaleryDto,

    ) {
        const data = await this.userService.createOne(dtoUser);
        return {
            message: "Usuario Creado",
            user: data,
        }
    }

    @Auth()
    @Get('/personal/:id')
    async getUserPersonal(@Param('id', ParseIntPipe) id: number) {
        const data = await this.userService.getUserPersonal(id);
        return {
            message: "Usuario Cargado",
            data: data
        }
    }

    @Auth()
    @Post('/personal')
    async createUserWithPersonal(
        @Body() dtoUser: CreateUserPersonalDto,
        @Body("personalDetails") dtoPersonalDetails: CreatePersonalDetailsDto,
    ) {
        // const data = await this.userService.createUserWithPersonal(dtoUser,dtoPersonalDetails);
        const data = await this.userService.createOneUserPersonal(dtoUser);
        return {
            message: "Usuario Creado",
            data: data,
        }
    }

    @Auth()
    @Put('/personal/:id')
    async editUserWithPersonal(
        @Param('id') id: number, 
        @Body() dtoUser: EditUserPersonalDto,
        @Body("personalDetails") dtoPersonalDetails: CreatePersonalDetailsDto,
        //@Body("branch") dtoBranch: CreateBranchDto,
    ) {
        const data = await this.userService.editOneUserPersonal(id,dtoUser);
        return {
            message: "Usuario Editado",
            data: data,
        }
    }


    @Auth()
    @Get('/personal')
    async getpersonals(@Param('id') id:number){
        const data= await this.userService.getManypersonal();
        return {
            message:"Personal cargado",
            data:data
        }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id: number, @Body() dto: EditUserDto) {
        const data = await this.userService.editOne(id, dto);
        return {
            message: "Usuario Editado",
            data: data
        }
    }

    @Auth()
    @Get('/payment/:id')
    async get(@Param('id') id:number){
        const data= await this.userService.findPaymentByConcept(id);
        return {
            message:"Concepto pago usuario cargado",
            data:data
        }

    }

    @Auth()
    @Post('/payments/:id')
    async createPayment(
        @Body() dtoPayment: CreatePaymentDto, @Param('id')id:number, @Res() req) {
            
            var header = (req.req || req).headers.authorization;
      
            var idUser;
            await this.userService.validateToken(header)
            .then(mensaje=>{
                idUser=mensaje.sub
                const data = this.paymentService.createOne(dtoPayment,id,idUser).then(
                    
                    (me=>req.status(HttpStatus.OK).json(me))
                    
                    )
                      return {
                    message: "Pago Creado",
                    data: data,
                }

            }).catch(
                
            )
      
    }

    @Auth()
    @Put('/editadvancesPlan/:id')
    async editAdvancePlan(@Param('id') id:number,@Body()dto:EditAdvancePlanDto){
       const data= await this.advancePlanService.editOne(id,dto);

       return {
           message:"Plan de adelanto Editado",
           data:data
       }
    }
    @Auth()
    @Put('/editadvances/:id')
    async editAdvance(@Param('id') id:number,@Body()dto:EditAdvanceDto){
       const data= await this.advanceService.editOne(id,dto);
       return {
           message:"Adelanto Editado",
           data:data
       }
    }
    @Auth()
    @Put('/editpaymentsconcept/:id')
    async editPaymentConcept(@Param('id') id:number,@Body()dto:EditPaymentconceptDto ){
        const data= await this.paymentconceptService.editOne(id,dto);

        return {
            message:"Concepto de pago Editado",
            data:data
        }
    }
    @Auth()
    @Put('/editpayments/:id')
    async editPayment(@Param('id') id:number,@Body()dto:EditPaymentDto){
       const data= await this.paymentService.editOne(id,dto);

       return {
           message:"Pago Editado",
           data:data
       }
    }


   
    @Auth()
    @Get('/dataHealth/:id')
    async getUserAndDataHealthById(@Param('id') id:number)
    {
        const data= await this.userService.getUserAndDataHealthById(id);
        return {
            message:"Detalles medicos cargados",
            data:data
        }
    }

    @Auth()
    @Put('/editDatahealth/:id')
    async editDatahealth(@Param('id') id:number,@Body()dto:EditDatahealthDto){
       const data= await this.dataHealthService.editOne(id,dto);
       return {
           message:"Datos de salud Editados",
           data:data
       }
    }

    @Auth()
    @Delete('/deleteDatahealth/:id')
    async deleteDatahealth(@Param('id') id:number){
        const data= await this.dataHealthService.deleteOne(id);    
        return {
            message:"Ficha eliminada con ¡exitó!",
            data:data
        }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        const dataUser = await this.userService.deleteOne(id);
        return {
            message: "Usuario Eliminado",
            data: dataUser
        }
    }
    @Auth()
    @Delete('/deleteadvancesPlan/:id')
    async deleteAdvancePlan(@Param('id') id:number){
        const data= await this.advancePlanService.deleteOne(id);    
        return {
            message:"Adelanto Eliminado",
            data:data
        }
    }

    @Auth()
    @Delete('/deleteAdvance/:id')
    async deleteAdvance(@Param('id') id:number, @Body("advanceId") advanceId){
        const data= await this.advanceService.deleteOneAdvance(id,advanceId);    
        return {
            message:"Avance Eliminado",
            data:data
        }
    }

    @Auth()
    @Delete('/payments/:id')
    async deletePayments(@Param('id') userId:number, @Body("paymentId") paymentId){

        const data= await this.paymentService.deleteOnePayment(userId,paymentId);
        return {
            message:"Pago Eliminado",
            data:data
        }
    }


    @Auth()
    @Get('/parents/:id')
    async getUserParents(@Param('id') id: number) {
        const data = await this.parentService.findParentsByUserId(id);
        return {
            message: "Acudientes cargados",
            data: data
        }
        
    }

    @Auth()
    @Put('/editParents/:id')
    async editParents(@Param('id') id:number,@Body()dto:EditParentDto){
       const data= await this.parentService.editOne(id,dto);

       return {
           message:"Informacion de Acudiente actualizada",
           data:data
       }
    }
    @Auth()
    @Delete('/deleteParents/:id')
    async deleteParents(@Param('id') id:number){
        const data= await this.parentService.deleteOne(id);    
        return {
            message:"Acudiente eliminado con ¡exito!",
            data:data
        }
    }

    @Auth()
    @Post('/parents')
    async createUserDetails(
            @Body()dto:[CreateParentDto]
    ){
       const data= await this.parentService.createOne(dto);
       return {
           message:"Formulario de acudientes cargado con exito",
           data:data
       }
    }

    @Auth()
    @Get('/userDetails/:id')
    async getUserAndUserDetailsById(@Param('id') id:number)
    {
        const data= await this.userService.getUserAndUserDetailsById(id);
        return {
            message:"Detalles del usuario cargado",
            data:data
        }
    }

    @Auth()
    @Put('/editUserDetails/:id')
    async editUserDetails(@Param('id') id:number,@Body()dto:EditUserDetailsDto){
       const data= await this.userDetailsService.editOne(id,dto);
       return {
           message:"Detalles del usuario actualizados con ¡exito!",
           data:data
       }
    }

    @Auth()
    @Delete('/deleteUserDetails/:id')
    async deleteUserDetails(@Param('id') id:number){
        const data= await this.userDetailsService.deleteOne(id);    
        return {
            message:"Detalles del usuario eliminados con ¡exito!",
            data:data
        }
    }
    
    @Auth()
    @Get('/responsibleSign/:id')
    async getUserAndResponsibleSignById(@Param('id') id:number)
    {
        const data= await this.userService.getUserAndResponsibleSignById(id);
        return {
            message:"Responsable del inscrito cargado",
            data:data
        }
    }

    @Auth()
    @Get('/branches/:id')
    async getUserAndBranchById(@Param('id') id:number)
    {
        const data= await this.userService.getUserAndBranchById(id);
        return {
            message:"Rama cargada",
            data:data
        }
    }

    @Auth()
    @Post('/usersBranches')
    async editOneUsersBranches(
        @Body('usersId')usersId:number,
        @Body('branchesId')branchesId:number
        ){
       const data= await this.userService.editOneUsersBranches(usersId, branchesId);
       return {
           message:"Usuario Editado",
           data:data
       }
    }
    
    @Auth()
    @Get('/generatePDF/:id')
    async generatePDF(@Param('id') id: number, @Res() res) {
        const user_data = await this.userService.getOne(id);
        const data_details = await this.userDetailsService.getOne(id);
        const data_healths = await this.dataHealthService.getOne(id);
        const data_diseases = data_healths.diseases;
        const data_interventions = data_healths.interventions;


        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };

        const printer = new PdfPrinter(fonts);

        const docDefinition = {
            content: [
                { text: 'Datos Usuario', fontSize: 20, bold: true },
                {
                    layout: 'noBorders', // optional
                    table: {
                        headerRows: 1,
                        widths: [125, 125, 125, 125],
                        body: [

                            [{ fillColor: '#D7D7D7', text: 'Nombre', bold: true }, { fillColor: '#D7D7D7', text: 'Apellido', bold: true }, { fillColor: '#D7D7D7', text: 'Tipo Documento', bold: true }, { fillColor: '#D7D7D7', text: 'Documento', bold: true },],
                            [user_data.name, user_data.lastName, user_data.documentType, user_data.document],
                            [{ fillColor: '#D7D7D7', text: 'Tipo de Sangre', bold: true }, { fillColor: '#D7D7D7', text: 'RH', bold: true }, { fillColor: '#D7D7D7', text: 'EPS', bold: true }, { fillColor: '#D7D7D7', text: 'Sexo', bold: true }],
                            [data_details.bloodType, data_details.rh, data_details.eps, data_details.sex],
                            ['', '', '', ''],
                            ['', '', '', ''],
                            ['', '', '', ''],
                            [{ text: 'Acudientes', fontSize: 20, bold: true }, '', '', ''],
                            [{ fillColor: '#D7D7D7', text: 'Acudiente 1', bold: true }, { fillColor: '#D7D7D7', text: 'Telefono 1', bold: true }, { fillColor: '#D7D7D7', text: 'Acudiente 2', bold: true }, { fillColor: '#D7D7D7', text: 'Telefono 2', bold: true }],
                            [data_healths.nameOneEmergency, data_healths.telephoneOneEmergency, data_healths.nameTwoEmergency, data_healths.telephoneTwoEmergency],
                            ['', '', '', ''],
                            ['', '', '', ''],
                            ['', '', '', ''],

                            ['', '', '', ''],
                            ['', '', '', ''],
                            ['', '', '', ''],
                            [{ text: 'Salud', fontSize: 20, bold: true }, '', '', ''],
                            [{ fillColor: '#D7D7D7', text: 'Alergias', bold: true }, { fillColor: '#D7D7D7', text: 'Enfermedades', bold: true }, { fillColor: '#D7D7D7', text: 'Medicamenos', bold: true }, { fillColor: '#D7D7D7', text: 'Dosis/Tiempo', bold: true }],
                            [data_healths.noteAllergies, data_healths.noteDiseases, data_healths.noteMedicine, data_healths.doseTime],
                            [{ fillColor: '#D7D7D7', text: 'Especificaciones', bold: true }, { fillColor: '#D7D7D7', text: 'Observaciones', bold: true }, { fillColor: '#D7D7D7', text: 'Seguro Médico', bold: true }, { fillColor: '#D7D7D7', text: 'No. Carné', bold: true }],
                            [data_healths.specification, data_healths.observations, data_healths.healthSecure, data_healths.cardNumber],
                            [{ fillColor: '#D7D7D7', text: 'Medico Particular', bold: true }, { fillColor: '#D7D7D7', text: 'Telefono', bold: true }, { fillColor: '#D7D7D7', text: 'Salud Actual', bold: true }, { fillColor: '#D7D7D7', text: 'Salud Adicional', bold: true }],
                            [data_healths.privateDoctor, data_healths.doctorTelephone, (data_diseases.length > 0 ? data_diseases[0].nameDisease : '') + ", " + (data_diseases.length > 0 ? data_diseases[0].whichDisease : ''), (data_interventions.length > 0 ? data_interventions[0].typeIntervention : '') + ", " + (data_interventions.length > 0 ? data_interventions[0].whichIntervention : '')],

                        ],



                    },

                },

            ],
            defaultStyle: {
                font: 'Helvetica'
            }
        };

        const options = {
        }
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);

        let chunks = [];

        pdfDoc.on('data', (chunk) => {
            chunks.push(chunk);
        });
        
        pdfDoc.on('end', () => {
            res.setHeader('Content-disposition', `attachment; filename=ficha-${user_data.document}.pdf`);
            res.contentType("application/pdf");
            res.send(Buffer.concat(chunks));
        });

        pdfDoc.end();
        
    }
    @Auth()
    @Get('/image/:id')
    async getUserImage(@Param('id') id:number, @Res() res){
        const data = await this.userService.getPhoto(id)
        if(data.profileImage.fieldname=="") throw new NotFoundException("Este usuario no tiene cargada ninguna image");
        res.sendFile(data.profileImage.filename, { root: 'uploads/users'})
        
    }
       
    /**
     * 
     * @param id userID
     */
    @Auth()
    @Get('/advancePlan/:id')
    async getAdvancePlan(@Param('id') id:number){
        const data= await this.advancePlanService.getAdvancePlan(id);
        return {
            message:"Plan de adelantos cargado",
            data:data
        }
        

    }              
    /**
     * 
     * @param id userID
     */
    @Auth()
    @Post('/advance/:id')
    async createOneAdvance(
        @Body()dtoAdvance:CreateAdvanceDto,
        @Param('id', ParseIntPipe) id:number
    ){
       const data= await this.advanceService.createOne(dtoAdvance, id);
       return {
           message:"Nuevo avance cargado",
           data:data
       }
    }

    @Auth()
    @Post('/advancePlan/:id')
    async createOneAdvancePlan(
        @Body()dto:CreateAdvancePlanDto,
        @Body("branches")dtobranches:CreateBranchDto,
        @Param('id', ParseIntPipe) id:number
    ){
       const data= await this.advancePlanService.createOne(dto,id, dtobranches);
       return {
           message:"Nuevo plan de adelanto cargado",
           data:data
       }
    }
}