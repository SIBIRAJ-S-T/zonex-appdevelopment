package com.example.demo.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.Auction;
import com.example.demo.Entity.Bid;
import com.example.demo.Entity.ChatMessage;
import com.example.demo.Entity.CurrentUser;
import com.example.demo.Entity.DeletedUser;
import com.example.demo.Entity.LoginHistory;
import com.example.demo.Entity.LogoutHistory;
import com.example.demo.Entity.PhoneNumber;
import com.example.demo.Entity.ShowUser;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Entity.YourApp;
import com.example.demo.Repository.AuctionRepo;
import com.example.demo.Repository.BidRepo;
import com.example.demo.Repository.ChatMessageRepo;
import com.example.demo.Repository.CurrentUserRepo;
import com.example.demo.Repository.DeletedUserRepo;
import com.example.demo.Repository.LoginHistoryRepo;
import com.example.demo.Repository.LogoutHistoryRepo;
import com.example.demo.Repository.PhoneNumberRepo;
import com.example.demo.Repository.ShowUserRepo;
import com.example.demo.Repository.UserRepo;
import com.example.demo.Repository.YourAppRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	@Autowired
	DeletedUserRepo delrepo;
	
	@Autowired
	LoginHistoryRepo lhrepo;
	
	@Autowired
	CurrentUserRepo currentuserrepo;
	
	@Autowired
	ShowUserRepo showuserrepo;
	
	@Autowired
	LogoutHistoryRepo lgoutrepo;
	
	@Autowired
	YourAppRepo yourapprepo;
	
	@Autowired
	ChatMessageRepo chatmessagerepo;
	
	
	@Autowired
	PhoneNumberRepo phonenumberrepo;
	


    public UserEntity saveUser(UserEntity user) {
        return repo.save(user);
    }



	public String get_By_Id(String username,String password) {
		UserEntity a=repo.get_By_Id(username);
		if(a==null){
			return "user";
		}
		else if( a.getPassword().equals(password)) {
			return "ok";
		}
		else {
			return "pass";
		}
	}
	
	public String deleteByName(String username, String password) {
	    UserEntity user = repo.get_By_Id(username);
	    if (user == null) {
	        return "Invalid username";
	    } else if (!user.getPassword().equals(password)) {
	        return "Incorrect password";
	    } else {
	    	DeletedUser deletedUser = new DeletedUser();
	        deletedUser.setUsername(user.getUsername());
	        deletedUser.setEmail(user.getEmail());
	        deletedUser.setPassword(user.getPassword());
	        
	        delrepo.save(deletedUser);
	        
	        repo.delete_By_Name(username, password);
	        return "ok";
	    }
	}
	
	
	public String deleteByShowUserName(String username) {
	    ShowUser user = showuserrepo.findByUsername(username);
	    if (user == null) {
	        return "Invalid username";
	    } 
	    else {
	        showuserrepo.delete_By_Name_ShowUser(username);
	        return "ok";
	    }
	}
	
	public String updatePassword(String username, String oldPassword, String newPassword) {
        UserEntity user = repo.get_By_Id(username);
        if (user == null) {
            return "Username does not exist";
        } else if (!user.getPassword().equals(oldPassword)) {
            return "Incorrect old password";
        } else {
            user.setPassword(newPassword);
            repo.save(user);
            return "Password updated successfully";
        }
    }
	
	public boolean checkUsernameExists(String username) {
        return repo.existsByUsername(username);
    }

	public LoginHistory saveLoginHistory(LoginHistory user) {
		// TODO Auto-generated method stub
		return lhrepo.save(user);
	}
	
	public LogoutHistory saveLogoutHistory(LogoutHistory user) {
		// TODO Auto-generated method stub
		return lgoutrepo.save(user);
	}



	public CurrentUser saveCurrentUser(CurrentUser user) {
		// TODO Auto-generated method stub
		return currentuserrepo.save(user);
	}
	
	
	public String logout(String username) {
        CurrentUser user = currentuserrepo.findByUsername(username);
        if (user != null) {
            currentuserrepo.deleteByUsername(username);
            return "User logged out successfully";
        } else {
            return "User not found";
        }
    }
	
	
	// Function to delete inactive users
	@Scheduled(fixedRate = 1 * 60 * 1000)
    public void deleteInactiveUsers() {
        LocalDateTime fifteenMinutesAgo = LocalDateTime.now().minusMinutes(1);
        currentuserrepo.deleteInactiveUsers(fifteenMinutesAgo);
    }
	
	
	public Long getUserCount() {
        return currentuserrepo.count();
    }
	
	//live user already exists
	public boolean checkLiveUsernameExists(String username) {
        return currentuserrepo.existsByUsername(username);
    }



	public ShowUser saveShowUser(ShowUser user) {
		// TODO Auto-generated method stub
		return showuserrepo.save(user);
	}
	
	public ShowUser getUserByUsername(String username) {
        return showuserrepo.findByUsername(username);
    }
	
	
//	public YourApp saveApp(YourApp yourapp) {
//        return yourapprepo.save(yourapp);
//    }
	
	
//	public List<YourApp> getAllYourApps() {
//        return yourapprepo.findAll();
//    }
	
	
	public YourApp saveApp(YourApp yourapp, MultipartFile appicon) throws IOException {
        if (appicon != null && !appicon.isEmpty()) {
            yourapp.setAppicon(appicon.getBytes());
        }
        return yourapprepo.save(yourapp);
    }

    public List<YourApp> getAllYourApps() {
        return yourapprepo.findAll();
    }
    
    public YourApp getAppById(Long id) {
        return yourapprepo.findById(id).orElse(null);
    }

	
	
	public boolean checkAppUrlExists(String appurl) {
		return yourapprepo.existsByAppurl(appurl);
	}
	
	public void deleteYourApp(Long id) {
        Optional<YourApp> yourApp = yourapprepo.findById(id);
        if (yourApp.isPresent()) {
            yourapprepo.delete(yourApp.get());
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }

	public YourApp updateYourApp(Long id, YourApp updatedApp, byte[] imageBytes) {
        YourApp existingApp = yourapprepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingApp.setAppurl(updatedApp.getAppurl());
        existingApp.setAppname(updatedApp.getAppname());
        existingApp.setPrice(updatedApp.getPrice());
        existingApp.setDistrict(updatedApp.getDistrict());
        existingApp.setState(updatedApp.getState());
        existingApp.setPincode(updatedApp.getPincode());
        existingApp.setOwner(updatedApp.getOwner());
        existingApp.setContact(updatedApp.getContact());
        existingApp.setAddress(updatedApp.getAddress());

        if (imageBytes != null) {
            existingApp.setAppicon(imageBytes);
        }

        return yourapprepo.save(existingApp);
    }

    
    public List<ChatMessage> getAllMessages() {
        return chatmessagerepo.findAll();
    }

    public ChatMessage saveMessage(ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatmessagerepo.save(message);
    }
    
    @Autowired
    private AuctionRepo auctionRepository;

    @Autowired
    private BidRepo bidRepository;

    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }

    public Auction getAuctionById(Long id) {
        return auctionRepository.findById(id).orElse(null);
    }

    public byte[] getImageById(Long id) {
        Auction auction = getAuctionById(id);
        return (auction != null) ? auction.getImage() : null;
    }

    public Auction saveAuction(Auction auction, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            auction.setImage(image.getBytes());
        }
        return auctionRepository.save(auction);
    }

    public Bid saveBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByAuctionId(Long auctionId) {
        return bidRepository.findByAuctionIdOrderByAmountAsc(auctionId);
    }

    public Bid getHighestBid(Long auctionId) {
        return bidRepository.findByAuctionIdOrderByAmountDesc(auctionId).stream().findFirst().orElse(null);
    }

    public String getWinner(Long auctionId) {
        Bid highestBid = getHighestBid(auctionId);
        return highestBid != null ? highestBid.getUsername() : "No bids placed";
    }
    
    public PhoneNumber savePhoneNumber(PhoneNumber phoneNumber) {
        return phonenumberrepo.save(phoneNumber);
    }
    
    public PhoneNumber getPhoneNumberByUsername(String username) {
        return phonenumberrepo.findByUsername(username);
    }
    
    public boolean isUsernamePresent(String username) {
        return phonenumberrepo.existsByUsername(username);
    }
    
}