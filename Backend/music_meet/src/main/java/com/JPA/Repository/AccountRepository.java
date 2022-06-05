package com.JPA.Repository;

import com.JPA.Entity.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, String>
{

}
