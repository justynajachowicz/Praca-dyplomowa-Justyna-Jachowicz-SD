package com.ans.shopping_dashboard.repository;

import com.ans.shopping_dashboard.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);

    @Modifying
    @Transactional
    @Query(value = "delete from users_roles where user_id=:id", nativeQuery = true)
    void deleteUserRolesById(Long id);
}