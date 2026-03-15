package com.telugu.cuj.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.telugu.cuj.dto.RegisterRequest;
import com.telugu.cuj.entity.Alumni;
import com.telugu.cuj.entity.Professor;
import com.telugu.cuj.entity.Student;

@Mapper(componentModel = "spring")
public interface RegisterMapper {

//    RegisterMapper INSTANCE = Mappers.getMapper(RegisterMapper.class);

    // Student mapping
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "department", target = "department")
    @Mapping(source = "studentAchievements", target = "achievements")
    
    Student toStudent(RegisterRequest req);

    // Professor mapping
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "department", target = "department")
    Professor toProfessor(RegisterRequest req);

    // Alumni mapping
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "alumniAchievements", target = "alumniAchievements")
    @Mapping(source = "department", target = "department")
    Alumni toAlumni(RegisterRequest req);
    
}
