```python

from collections import defaultdict

class Graph:

    def __init__(self):
        self.graph = defaultdict(list)

    def add_edge(self, u, v):
        self.graph[u].append(v)
        self.graph[v].append(u)  

#   def __init__(self):
#       self.graph = {}
    
#   def add_edge(self, u, v):
#       if u not in self.graph:
#           self.graph[u] = set([v])
#       elif v not in self.graph[u]:
#           self.graph[u].add(v)
#
#       if v not in self.graph:
#           self.graph[v] = set([u])
#       elif u not in self.graph[u]:
#           self.graph[v].add(u)

    def breadth_first_search(self, v):
        
#       1. check is starting node is in graph dict
        if v not in self.graph: 
            return []
        
#       2. Create an empty visited list.
        visited = []
        
#       3. Create an empty to_visit list.
        to_visit = [v]
        
#       4. while to_visit is not empty
        while len(to_visit):
#          4.1  Pop the first vertex off the to_visit list 
#          4.2  and visit it by appending it to visited
            visited.append(to_visit.pop(0))
            
#           4.3 get the nodes at the current visited node
            nodes = self.graph[visited[len(visited)-1]]
            
#           4.4 while there are nodes in the current node
            if len(nodes):
#               4.4.1 for each neighbout
                for neighbour in nodes:
#                   4.4.2 if the neighbour has not been visited yet
                    if neighbour not in visited:
#                       4.43 add it to the to_visit list
                        to_visit.append(neighbour)
                        
#       5. finally return visited list
        return visited 


        # -- TEST SUITE, DON'T TOUCH BELOW THIS LINE --


def main():
    graph = Graph()
    graph.add_edge(0, 1)
    graph.add_edge(0, 4)
    graph.add_edge(1, 4)
    graph.add_edge(4, 3)
    graph.add_edge(1, 3)
    graph.add_edge(1, 2)
    graph.add_edge(2, 3)


    print_order(graph, 1)
    print_order(graph, 3)
    print_order(graph, 5)
    print_order(graph, 7)
    print_order(graph, 9)

    
def print_order(graph, start):
    print(f"starting from {start}, order is {graph.breadth_first_search(start)}")
    
    
main()

```