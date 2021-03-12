import random
import pandas as pd

rewardList = [0, 200, 300, 500, 1000, 2000]
threshould = 4000
probability = [1200, 800, 50, 50, 10, 10]
initial_value = 5000
iteration = 3000

reward_id = [x for x in range(iteration)]
rewards = []
remains = []

current_remain = initial_value
probability_sum = sum(probability)
probability_cdf = [0]

for i in range(len(probability)):
    probability_cdf.append(probability_cdf[i] + probability[i])

for i in reward_id:
    current_remain = current_remain + 100
    reward = random.randint(1, probability_sum)
    # print(reward)
    for p in range(len(probability_cdf)):
        if p == len(probability_cdf) - 1:
            reward = rewardList[p]
            break
        elif reward > probability_cdf[p] and reward <= probability_cdf[p + 1]:
            reward = rewardList[p]
            break
    if current_remain - reward < threshould:
        reward = 0
    rewards.append(reward)
    current_remain = current_remain - reward
    remains.append(current_remain)

dummy_data = ["" for x in range(iteration)]
dummy_data[0] = 0

df = pd.DataFrame(
    list(zip(reward_id, rewards, remains, dummy_data)),
    columns=["reward_id", "rewards", "remains", "current_id"],
)
# df.to_excel("reward_list.xlsx")
df.to_csv("reward_list.csv")

print(f"Total iteration: {iteration} Total Remain: {remains[-1]}")
for i in rewardList:
    counter = 0
    for j in rewards:
        if i == j:
            counter = counter + 1
    print(f"Reward {i}: {counter} times")